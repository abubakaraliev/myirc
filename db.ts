const mysql = require('mysql');
require('dotenv').config()

export const db = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : process.env.PASSWORD,
    database        : process.env.DATABASE,
    port            : process.env.PORT
})

db.connect(function(err: any) {
    if (err)  console.log(err);
    else
    console.log(`Database connecter sur le port ${process.env.PORT}`);
});