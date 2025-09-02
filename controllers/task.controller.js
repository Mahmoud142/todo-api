const prisma = require('../config/db');

const asyncHandler = require('express-async-handler');

//@desc Create a new task
//@route POST /api/tasks
//@access Private
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

//@desc Get all tasks
//@route GET /api/tasks
//@access Private
exports.getAllTasks = asyncHandler(async(req,res,next)=>{
    const tasks = await prisma.task.findMany({
        where:{userId: req.user.id}
    });

    res.status(200).json({
        status: "success",
        data: tasks
    });
})


//@desc Update a task
//@route PUT /api/tasks/:id
//@access Private
exports.updateTask = asyncHandler(async(req, res, next)=>{
    
    const task = await prisma.task.update({
        where: { id: parseInt(req.params.id), userId: req.user.id },
        data: {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        },
    });

    res.status(200).json({
        status: "success",
        data: task
    });
})

//@desc Get a single task
//@route GET /api/tasks/:id
//@access Private
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

//@desc Delete a task
//@route DELETE /api/tasks/:id
//@access Private
exports.deleteTask = asyncHandler(async (req, res, next)=>{
    const task = await prisma.task.delete({
        where:{id: parseInt(req.params.id), userId: req.user.id}
    })

    res.status(204).json({
        status: "success",
        data: null
    })
})