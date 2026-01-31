import db from "../db/db";

class DocumentDAO {
    async getDocuments(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            const sql = `
                SELECT 
                    D.id,
                    D.title,
                    D.description,
                    D.pos
                FROM Document D
            `;

            db.all(sql, [], (err: Error | null, rows: any[]) => {
                if (err) {
                    return reject(err);
                }

                const documents = rows.map((row) => ({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    pos: row.pos
                }));

                resolve(documents);
            });
        });
    }

    async createDocument(title: string, description: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                const sql = `
                    INSERT INTO Document (title, description, pos)
                    VALUES (?, ?, COALESCE((SELECT MAX(pos) FROM Document), 0) + 1)
                `;
                db.run(sql, [title, description], function (err: Error | null) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ title, description });
                });
            }
            catch (error: any) {
                reject(error);
            }
        });
    }

    async updateDocument(id: number, title?: string, description?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                const updates: string[] = [];
                const params: any[] = [];

                if (title !== undefined) {
                    updates.push("title = ?");
                    params.push(title);
                }

                if (description !== undefined) {
                    updates.push("description = ?");
                    params.push(description);
                }

                if (updates.length === 0) {
                    return reject(new Error("No fields to update"));
                }

                params.push(id);

                const sql = `
                    UPDATE Document 
                    SET ${updates.join(", ")}
                    WHERE id = ?
                `;

                db.run(sql, params, function (err: Error | null) {
                    if (err) {
                        return reject(err);
                    }

                    if (this.changes === 0) {
                        return reject(new Error("Document not found"));
                    }

                    resolve({ id, title, description });
                });
            } catch (error: any) {
                reject(error);
            }
        });
    }

    async updateDocumentPosition(id: number, pos: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const get_sql = `
                SELECT 
                    (SELECT pos FROM Document WHERE id = ?) as current_pos,
                    (SELECT MAX(pos) FROM Document) as max_pos
            `;

            db.get(get_sql, [id], (err: Error | null, row: any) => {
                if (err) return reject(err);
                if (!row || row.current_pos == null) {
                    return reject(new Error("Document not found"));
                }

                const old_pos = row.current_pos;
                const max_pos = row.max_pos;
                const new_pos = Math.max(1, Math.min(pos, max_pos));

                if (new_pos === old_pos) {
                    return resolve({ id, old_pos, new_pos });
                }

                db.serialize(() => {
                    db.run("BEGIN TRANSACTION");

                    if (new_pos < old_pos) {
                        db.run(`UPDATE Document SET pos = pos + 1 WHERE pos >= ? AND pos < ?`,
                            [new_pos, old_pos]);
                    } else {
                        db.run(`UPDATE Document SET pos = pos - 1 WHERE pos > ? AND pos <= ?`,
                            [old_pos, new_pos]);
                    }

                    db.run(`UPDATE Document SET pos = ? WHERE id = ?`, [new_pos, id]);

                    db.run("COMMIT", (err: Error | null) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({ id, old_pos, new_pos });
                    });
                });
            });
        });
    }
}

export default DocumentDAO;
