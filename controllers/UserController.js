const db = require('../db/query.js');
const bcrypt = require('bcryptjs');
async function insertUser(req,res){
    try{
        const {fullname,email,password,confirmedPassword,admin} = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const hashedConfirmedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await db.insertUser({fullname,email,hashedPassword,admin})
        res.redirect('/');
    }   
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error' );
    }
}

module.exports = {
    insertUser
}