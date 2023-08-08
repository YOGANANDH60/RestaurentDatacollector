const express=require('express')
const app=express()
const path=require('path')
const fs=require('fs')
const uuid=require('uuid')
const { name } = require('ejs')

app.use(express.urlencoded({extended:false}))


app.set("views",path.join(__dirname,'views'))
app.set("view engine","ejs")

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/recommend',(req,res)=>{
    res.render("recommend")
})

app.get('/restaurents/:id',function(req,res) {
    const elemId=req.params.id
    const datapath=path.join(__dirname,"data","restaurents.json")
    const data=fs.readFileSync(datapath)
    const existingdata=JSON.parse(data)
    for(const existing of existingdata){
        if(existing.id === elemId){
            res.render('restaurent-item',{restaurent:existing})
        }
    }
})

app.post('/recommend',(req,res)=>{
    const restaurent=req.body;
    restaurent.id=uuid.v4()
    const filepath=path.join(__dirname,"data","restaurents.json");
    const data=fs.readFileSync(filepath);
    const existingdata=JSON.parse(data)
    existingdata.push(restaurent);
    fs.writeFileSync(path.join(__dirname,"data","restaurents.json"),JSON.stringify(existingdata))
    res.render('confirm')
})
app.get('/restaurent',(req,res)=>{
    const datapath=path.join(__dirname,'data','restaurents.json')
    const data=fs.readFileSync(datapath)
    const existingdata=JSON.parse(data)
    res.render('restaurent',{ numberofrestaurent:existingdata.length , restaurents :existingdata })
})
app.listen(3000)
