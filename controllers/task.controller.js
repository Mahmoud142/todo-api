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


exports.updateTask = asyncHandler(async(req, res, next)=>{
    const cur_status = req.body.status;
    if(cur_status !== "completed"  && cur_status !== "in_progress"){
        cur_status = "pending";
    }
    const task = await prisma.task.update({
        where: { id: parseInt(req.params.id), userId: req.user.id },
        data: {
            title: req.body.title,
            description: req.body.description,
            status: cur_status
        },
    });

    res.status(200).json({
        status: "success",
        data: task
    });
})

exports.getSingleTask = asyncHandler(async(req, res, next)=>{
    const task= await prisma.task.findUnique({
        where:{id: parseInt(req.params.id), userId: req.user.id}
    })

    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        return next(error);
    }

    res.status(200).json({
        status: "success",
        data: task
    });
})

exports.deleteTask = asyncHandler(async (req, res, next)=>{
    const task = await prisma.task.delete({
        where:{id: parseInt(req.params.id), userId: req.user.id}
    })

    res.status(204).json({
        status: "success",
        data: null
    })
})