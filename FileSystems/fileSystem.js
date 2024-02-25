const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 7000

/* Path */
/* current dir name/timestamps */

const dirPath = path.join(__dirname, "timestamps");

/* initilalizing express server */
const server = express();

/* middleware */
server.use(express.static("timestamps"));

/* api's */
server.get("/", (req, res)=>{
    res.send(`<h1>Hi Welcome</h1>`);
})

server.get("/static", (req, res)=>{
    let time = new Date();
    let dateStr = time.toUTCString().slice(0, -3);
    console.log(dateStr);
    let content = `Last updated timestamp is ${dateStr}`;
    fs.writeFileSync(`${dirPath}/date-time.txt`, content, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("File created successfully...");
        }
    })
    res.sendFile(path.join(__dirname, "timestamps/date-time.txt"))
})

/* server start with localhost:7000 */
server.listen(port, ()=>console.log(`server started for localhost:${port}`))