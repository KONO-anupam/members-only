const db = require('../db/query.js');

async function insertUser(req,res){
    try{
        const hashedPassword = brypt.hash(req.body.password,10);
        const {username,hashedPassword} = req.body;

        const user = await db.insertUser({username, hashedPassword})
    }   
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error' );
    }
}

module.exports = {
    insertUser
}