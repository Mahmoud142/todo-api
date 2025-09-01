const prisma = require('../config/db');
const asyncHandler = require('express-async-handler');



exports.createCategory = asyncHandler(async (req, res) => {
    

    const category = await prisma.category.create({
        data: {
            title: req.body.title,
            userId: req.user.id,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            category,
        },
    });
});


