import express  from "express";
import {dbConnection} from './database/connection.js'
import { noteModel } from "./database/model/note.model.js";
import { Server} from "socket.io";

const app = express();
const port = 3000

app.get('/', (req,res) => res.send('Hello'))
dbConnection();

const server = app.listen(port, ()=> console.log(`app listening on port ${port}`))

const io = new Server(server,{
    cors:"*"
})
io.on("connection", (socket)=>{

    socket.on("addNote",async(data)=>{
    console.log(data);
    await noteModel.insertMany(data)
    let allNotes = await noteModel.find({})
    socket.emit("allData", allNotes)
    })
    socket.on("load", async()=>{
    let allNotes = await noteModel.find({})
    socket.emit("allData", allNotes)
    })
    socket.on("DeleteNote" , async(data) =>{
    await noteModel.findByIdAndDelete(data)
    let allNotes = await noteModel.find({})
    socket.emit("allData", allNotes)
    })
})





