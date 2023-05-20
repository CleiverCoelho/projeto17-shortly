import { db } from "../database/database.connection.js"
import bcrypt from 'bcrypt';


export async function validateUserToken(req, res, next) {
    const userToken = req.headers.authorization?.replace("Bearer ", "");
    if(!userToken) return res.status(401).send("header nao informado")
    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [userToken])
        if (session.rowCount === 0) return res.status(401).send("token invalido")
        res.locals.userId = session.rows[0].userId
        return next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function validateUrlId(req, res, next) {
    const {id} = req.params;
    try {
        const url = await db.query(`SELECT * FROM urls WHERE id=$1`, [id])
        if (url.rowCount === 0) return res.status(404).send("url nao existe")
        res.locals.url = url.rows[0]
        return next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}