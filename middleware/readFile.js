const { createPath } = require("./");
const fs = require("fs").promises;

const readFile = async (req,res,next)=>{
    try{
        const db = JSON.parse(await fs.readFile(res.locals.pathToDB, "utf-8"));
        res.locals.users = db
        next();
    }catch(err){
        res.status(500).json({message: "Error! - " + err})
    }
}

module.exports.readFile = readFile