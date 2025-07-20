const pool = require('./pool');

async function insertUser({fullname,email,hashedPassword,admin}){
      const {rows} = await pool.query(
        `INSERT INTO users(fullname,email,password,admin)
        VALUES ($1,$2) `, [fullname,email,hashedPassword,admin]  
    );
    return rows[0].id;
}

async function findUsersByEmail(email){
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email])
    return rows[0].email;
}

module.exports = {
    insertUser,
    findUsersByEmail
}