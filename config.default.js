module.exports = {
    session:{
        "secret": "BMCD!!PLEASE CHANGE ME!!",   //请记得修改此处
        "key": "BMCD_ID",
        resave: true,
        saveUninitialized: true
    },
    users:{
        admin: "admin"
    },
    serverDirectory:'../server',
    port:'25560',
    db: {
        host: 'localhost',
        db: 'bmcd'
    }
};