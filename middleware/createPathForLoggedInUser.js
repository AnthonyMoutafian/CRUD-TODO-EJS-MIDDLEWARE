const path = require("path");

const createPathForLoggedInUser = (req, res, next) => {
  try {
    const pathToDBLoggedInUser = path.join(__dirname, "..", "db", "loggedInUser.json");
    res.locals.pathToDBLoggedInUser = pathToDBLoggedInUser;
    next();
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports.createPathForLoggedInUser = createPathForLoggedInUser;