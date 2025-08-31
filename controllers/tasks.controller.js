const prisma = require('../config/db');

exports.getAllTasks = async(req, res, next)=>{
    try{
        const tasks = await prisma.todo.findMany();
        res.status(200).json({
            data: tasks
        });
    }catch(error){
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}