const { application } = require("express");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const foundCourse = courses.find((ele) => ele.id === parseInt(courseId));
  if(!foundCourse){
      res.status(404).send(`Course not found`)
  }
  res.send(foundCourse);
});

app.post('/api/courses',(req,res)=>{
    const newCourse = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(newCourse)
    res.send(newCourse);
})

app.listen(port, () => console.log(`listening on Port ${port}`));
