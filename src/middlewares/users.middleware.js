import { db } from "../database/database.connection.js"

export async function validateSignUpEmail(req, res, next) {
    const { email } = req.body
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        if (user.rowCount === 0) return next()
        return res.status(409).send({ message: "Email informado já existe!" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}