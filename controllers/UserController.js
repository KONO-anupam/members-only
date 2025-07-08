const db = require('../db/query.js');

async function insertUser(req,res){
    try{
        const hashedPasswords = brypt.hash(req.body.password,10);
        await Pool.query("insert into users (username,password) values($1,$2)",[req.body.username,hashedPassword])
    }   
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error' );
    }
}