const express = require('express');
const app = express();
const port = 3000;
let list = [];
list = ["shopping","sport","homework"];
app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(__dirname + '/ToDoList.html')});

app.get('/list',(req,res)=>{
    res.json(list)
});



app.listen(port,()=>{console.log(`http://localhost:${port}`)});
