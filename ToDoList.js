const express = require('express');
const app = express();
const port = 3000;

const tasks = [];
let nextID = 1;

app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(__dirname + '/ToDoList.html')});

app.get('/tasks',(req,res)=>{
    res.status(200).json(tasks)
});

app.post('/tasks',(req,res)=>{
    let text = req.body.txt;
    if(!text){
        return res.status(400).json({message:"not valid"})
       
    }
    
    let id = nextID++;
    let task = {id,text};
    tasks[id] = task;
     res.status(201).json({message:"ok"})

})

app.delete('/tasks/:id',(req,res)=>{
    let id = req.params.id;
    if(id < 0 || tasks.length < id){
        return res.status(400).json({message:"אינו קיים"})
    }
    tasks[id] = null;
    res.status(201).json({message:"Deleted"})
});



app.listen(port,()=>{console.log(`http://localhost:${port}`)});
