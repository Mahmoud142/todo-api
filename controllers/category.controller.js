const { parse } = require('dotenv');
const prisma = require('../config/db');
const asyncHandler = require('express-async-handler');


//@desc Create a new category
//@route POST /api/categories
//@access Private
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

//@desc Get all categories
//@route GET /api/categories
//@access Private
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

//@desc Get a single category
//@route GET /api/categories/:id
//@access Private
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(req.params.id),
            userId: req.user.id,
        },
    });

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        return next(error);
    }

    res.status(200).json({
        status: "success",
        data: {
            category,
        },
    });
});

//@desc Update a category
//@route PUT /api/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(req.params.id),
            userId: req.user.id,
        },
    });

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        return next(error);
    }

    const updatedCategory = await prisma.category.update({
        where: {
            id: parseInt(req.params.id),
            userId: req.user.id,
        },
        data: {
            title: req.body.title,
        },
    });

    res.status(200).json({
        status: "success",
        data: {
            category: updatedCategory,
        },
    });
});


//@desc Delete a category
//@route DELETE /api/categories/:id
//@access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {

    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(req.params.id),
            userId: req.user.id,
        },
    });

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        return next(error);
    }

    await prisma.category.delete({
        where: {
            id: parseInt(req.params.id),
            userId: req.user.id,
        },
    });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

