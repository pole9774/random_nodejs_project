import db from "../db/db";

class DocumentDAO {
    async getDocuments(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            const sql = `
                SELECT 
                    D.id,
                    D.title,
                    D.description
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
                }));

                resolve(documents);
            });
        });
    }

    async createDocument(title: string, description: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                const sql = `
                    INSERT INTO Document (title, description)
                    VALUES (?, ?)
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
}

export default DocumentDAO;
