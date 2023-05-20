import { db } from "../database/database.connection.js"
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'


export async function shortUrl(req, res) {
    const {url} = req.body;
    const userId = res.locals.userId

    let mainUrl = '';
    let especifyUrl = '';
    let barCounter = 0
    url.split('').forEach(caractere => {
        if(caractere === '/' && barCounter < 3) {
            barCounter++
        }else  if(barCounter >= 3){
            especifyUrl += caractere;
        }
        else if(barCounter === 2){
            mainUrl += caractere;
        }
    })
    const shortUrl = nanoid(6)
    try {
        // criando tabela com o short id
        await db.query(`INSERT INTO urls (name, "userId", "shortUrl", views)
            VALUES ($1, $2, $3, $4)    
        `, [url, userId, shortUrl, 0])

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message)
    }
}