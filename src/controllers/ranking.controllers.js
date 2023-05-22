import { db } from "../database/database.connection.js"

export async function getRanking(req, res) {
    try {
        const {rows: ranking} = await db.query(`SELECT users.id, users.name, 
        SUM(urls.views) AS "visitCount" 
        FROM urls
        JOIN users ON users.id=urls."userId"
        GROUP BY users.id, users.name`)

        const {rows: linksCount} = await db.query(`SELECT COUNT(urls.id) AS "linksCount" 
        FROM urls
        JOIN users ON users.id=urls."userId"
        GROUP BY users.name`)
        
        const response = ranking.map((res, index) => {
            return {...res, ...linksCount[index]}
        })
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err.message)
    }
}
