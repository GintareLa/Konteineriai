import { connection } from "../db.js";

export async function getAllContainers(req, res) {
    try {
        const sql = `
            SELECT *, containers.id AS contID, 
            (SELECT COUNT(id) 
            FROM boxes 
            WHERE boxes.container_id=containers.id) AS boxes_in_container 
            FROM containers 
            LEFT JOIN boxes ON boxes.container_id=containers.id 
            GROUP by containers.id`;
        const [result] = await connection.execute(sql);
        return res.json({
            status: 'success',
            list: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: 'error',
            list: [],
            msg: 'Serverio klaida',
        });
    }
}