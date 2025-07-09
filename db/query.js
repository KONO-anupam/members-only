const pool = require('./pool');

async function insertUser({username,hashedPassword}){
      const {rows} = await pool.query(
        `INSERT INTO users(fullname,email,password,admin)
        VALUES ($1,$2) `, [fullname,email,hashedPassword,admin]  
    );
    return rows[0].id;
}

module.exports = {
    insertUser
}