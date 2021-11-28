const { application } = require("express");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3,4])
})

app.get('/api/courses/:id', (req,res)=>{
    const courseId = req.params.id;
    res.send(courseId);
})

app.listen(port, () => console.log(`listening on Port ${port}`));
