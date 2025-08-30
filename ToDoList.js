const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const tasks = [];
let nextID = 1;


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
    let isDone = false;
    let task = {id,text,isDone};
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

app.get('/tasks/:id',(req,res)=>{
    let id = req.params.id;
    if(id < 0 ||  tasks.length < id || tasks[id] == null){
        return res.status(400).json({message:"אינו קיים"})
    }
    res.json(tasks[id]);
});

app.patch('/tasks/:id',(req,res)=>{
    let id = req.params.id;
    if(id < 0 ||  tasks.length < id || tasks[id] == null){
        return res.status(400).json({message:"אינו קיים"})
    }
    let isDone = req.body.isDone;
    if(isDone != undefined){
        tasks[id].isDone = isDone;
    }
    let text = req.body.txt;
    if(text){
        tasks[id].text = text;
    }

    res.json(tasks[id]);

});


app.listen(port,()=>{console.log(`http://localhost:${port}`)});
