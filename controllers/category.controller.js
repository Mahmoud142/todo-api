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

exports.getAllCategories = asyncHandler(async (req, res,next) => {
    const categories = await prisma.category.findMany({
        where: {
            userId: req.user.id,
        },
    });

    res.status(200).json({
        status: "success",
        data: {
            categories,
        },
    });
});
