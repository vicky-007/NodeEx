const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());

let arr = [
  {
    id: 0,
    name: "course 0"
  },
  {
    id: 1,
    name: "course 1"
  },
  {
    id: 2,
    name: "course 2"
  },
  {
    id: 3,
    name: "course 3"
  },
  {
    id: 4,
    name: "course 4"
  },
  {
    id: 5,
    name: "course 5"
  },
  {
    id: 6,
    name: "course 6"
  },
  {
    id: 7,
    name: "course 7"
  },
  {
    id: 8,
    name: "course 8"
  },
  {
    id: 9,
    name: "course 9"
  }
];

app.get("/", (req, res) => {
  res.write("wow u got the url");
  res.end();
});

app.get("/api/courses", (req, res) => {
  res.send(arr);
  res.end();
});

app.get("/api/courses/:id", (req, res) => {
  const course = arr.find(data => data.id == parseInt(req.params.id));

  if (!course) return res.status(404).send("Data not found for this id");

  res.send(course);
  res.end();
});

app.post("/api/courses", (req, res) => {
  let obj = { id: arr.length, name: req.body.name };

  arr.push(obj);

  res.send(obj);
  res.end();

  // res.sendStatus(200);
});

app.put("/api/courses/:id", (req, res) => {
  const course = arr.find(data => data.id == parseInt(req.params.id));

  console.log(req.body.name);

  if (!course) return res.status(404).send("Data not found for this id");

  if (!req.body.name) return res.send(["name is required"]);

  course.name = req.body.name;

  res.send(course);
  res.end();
});

app.delete("api/courses/:id", (req, res) => {
  const course = arr.findIndex(data => data.id == parseInt(req.params.id));

  if (course == -1) return res.status(404).send("Data not found for this id");

  arr.splice(course, 1);

  res.send("deleted");
  res.end();
});

app.listen(3000, () => console.log("listening"));
