const express = require('express')

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// Task1: initiate app and run server at 3000

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://shibilatm:izzahimran@cluster0.wxvf2kk.mongodb.net/MyEmployeeDB?retryWrites=true&w=majority')

.then(()=>{
    console.log('Connected to EmployeeDB')
})

.catch(()=>{
    console.log('Error!!! No connection')
})

const EmployeeData = require('./model/EmployeeData');

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below




//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try{
        const Data = await EmployeeData.find();
        // console.log('Data fetched:', Data);
        res.status(200).json(Data);
    }catch(error){
        res.status(404).json({ error: error.message });
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await EmployeeData.find({ _id: id });
        if (result.length === 0) {
            res.status(404).json({ error: "Employee not found" });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
    const item = req.body;
    const data =new EmployeeData(item);
    const savedData = await data.save();
    res.status(200).json('Post successful');
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    const result = await EmployeeData.deleteOne({_id:id});
    if(result.length===0){
        res.status(404).json({error:'Employee not found'})
    }else{
        res.status(200).json('Deleted successfully');
    }
    }catch(error){
        res.status(500).json({error: error.message});
    }

})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
        const updatedData = req.body;
        const result = await EmployeeData.findOneAndUpdate({ _id: updatedData._id }, updatedData, { new: true });
        if (!result) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json('Updated successfully');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log('server is running on 3000');
})



