const pool = require('./pool');

async function insertUser({username,hashedPassword}){
      const {rows} = await pool.query(
        `INSERT INTO users(username,password)
        VALUES ($1,$2) `, [username,hashedPassword]  
    );
    return rows;
}

module.exports = {
    insertUser
}