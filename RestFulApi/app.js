const Joi = require("joi");
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
  if (!foundCourse) {
    res.status(404).send(`Course not found`);
  }
  res.send(foundCourse);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    // 400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const foundCourse = courses.find((ele) => ele.id === parseInt(req.params.id));
  if (!foundCourse) {
    res.status(400).send("no course available");
    return;
  }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
//   console.log(result);
  if (result.error) {
    // 400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }
  foundCourse.name = req.body.name;
  res.send(foundCourse);
});

app.listen(port, () => console.log(`listening on Port ${port}`));
