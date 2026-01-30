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
            catch (error) {
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
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default DocumentDAO;
