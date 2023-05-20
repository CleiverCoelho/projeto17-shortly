import { db } from "../database/database.connection.js"
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";


export async function shortUrl(req, res) {
    const {name, email, password} = req.body;
    const encriptedPassword = bcrypt.hashSync(password, 10);
    try {
        await db.query(`INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);`, [name, email, encriptedPassword]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message)
    }
}