const prisma = require('../config/db');

const asyncHandler = require('express-async-handler');


exports.createTask = asyncHandler(async(req, res, next) => {
  const task = await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id,
    },
  });

  res.status(201).json({
    status: "success",
    msg: "Task created successfully",
    data: task,
  });
});

exports.getAllTasks = asyncHandler(async(req,res,next)=>{
    const tasks = await prisma.task.findMany({
        where:{userId: req.user.id}
    });
    
    res.status(200).json({
        status: "success",
        data: tasks
    });
})