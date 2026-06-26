const { createPathForLoggedInUser } = require("./");
const fs = require("fs").promises;

const readFileForLoggedInUser = async (req,res,next)=>{
    try{
        const dbForLoggedInUser = JSON.parse(await fs.readFile(res.locals.pathToDBLoggedInUser, "utf-8"));
        res.locals.loggedInUser = dbForLoggedInUser
        next();
    }catch(err){
        res.status(500).json({message: "Error! - " + err})
    }
}

module.exports.readFileForLoggedInUser = readFileForLoggedInUser