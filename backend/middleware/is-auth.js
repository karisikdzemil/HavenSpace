const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeaders = req.header('Authorization');
    if(!authHeaders){
        const error = new Error('Not Authenticated!');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeaders.split(' ')[1];
    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
            err.statusCode = 500;
        throw err;
    }

    if(!decoded){
        const error = new Error('Not Authenticated!');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
}