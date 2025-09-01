const prisma = require('../config/db');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

exports.auth = asyncHandler(async (req, res, next) => {
    // get token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(AppError.create('You are not logged in', 401, FAIL));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user by id
    const currentUser = await prisma.user.findUnique({
        where: { id: decoded.id },
    });
    
    if (!currentUser) {
        return next(new Error('User not found'));
    }

    
    delete currentUser.password;
    req.user = currentUser;
    // console.log("I am here auth middleware and this is the req.user", req.user);
    next();
})
