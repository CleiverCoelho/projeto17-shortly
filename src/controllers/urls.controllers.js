import { db } from "../database/database.connection.js"
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'


export async function shortUrl(req, res) {
    const {url} = req.body;
    const userId = res.locals.userId

    // let mainUrl = '';
    // let especifyUrl = '';
    // let barCounter = 0
    // url.split('').forEach(caractere => {
    //     if(caractere === '/' && barCounter < 3) {
    //         barCounter++
    //     }else  if(barCounter >= 3){
    //         especifyUrl += caractere;
    //     }
    //     else if(barCounter === 2){
    //         mainUrl += caractere;
    //     }
    // })
    const shortUrl = nanoid(6)
    try {
        // criando tabela com o short id
        const lastId = await db.query(`SELECT id FROM urls ORDER BY id DESC LIMIT 1`)
        await db.query(`INSERT INTO urls (name, "userId", "shortUrl", views)
            VALUES ($1, $2, $3, $4)    
        `, [url, userId, shortUrl, 0])
        
        const response = {id: lastId.rows[0] + 1, shortUrl}
        // console.log(response)

        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getUrlById(req, res) {
    const {url} = res.locals;
    try {
        const response = {
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.name
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function openShortUrl(req, res) {
    // AINDA FALTA REDIRECIONAR O USUARIO
    const {url, views, shortUrl} = res.locals;
    try {
        await db.query(`UPDATE urls SET views=$1 WHERE "shortUrl"=$2`,
        [views + 1, shortUrl])
        res.status(200).send("atualizado com sucesso");
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteUrlById(req, res) {
    // AINDA FALTA REDIRECIONAR O USUARIO
    const {urlId} = res.locals;
    try {
        await db.query(`DELETE FROM urls WHERE id=$1`,
        [urlId])
        res.status(204).send("excluido com sucesso");
    } catch (err) {
        res.status(500).send(err.message)
    }
}



