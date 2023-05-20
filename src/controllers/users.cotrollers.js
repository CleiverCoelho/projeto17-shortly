import { db } from "../database/database.connection.js"
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";


export async function signUpUser(req, res) {
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

export async function signInUser(req, res) {
    try {
        const token = uuid();
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,
        [res.locals.userId, token])
        res.status(200).send({token})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// export async function createCustomer(req, res) {
//     const { name, phone, birthday, cpf } = req.body
//     try {
//         await db.query(`
//             INSERT INTO customers (name, phone, birthday, cpf)
//                 VALUES ($1, $2, $3, $4);
//         `, [name, phone, birthday, cpf])
//         res.sendStatus(201)
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// }

// export async function updateCustomer(req, res) {
//     const { id } = req.params
//     const { name, phone, birthday, cpf } = req.body

//     try {
//         await db.query(`
//             UPDATE customers 
//                 SET name=$1, phone=$2, birthday=$3, cpf=$4
//                 WHERE id=$5;
//         `, [name, phone, birthday, cpf, id])
//         res.sendStatus(200)
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// } 