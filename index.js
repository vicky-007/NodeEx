const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const { json } = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failiure", (req, res) => {
  res.redirect("/");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const fname = req.body.fn;
  const lname = req.body.ln;
  const email = req.body.email;

  const url = "https://us17.api.mailchimp.com/3.0/lists/9a0bb1d406";

  const options = { method: "post", auth: "vk:b31a95f253463bc33017d0e9e9e2fc95-us17" };

  const data = {
    members: [{ email_address: email, status: "subscribed", merge_fields: { FNAME: fname, LNAME: lname } }]
  };

  const request = https.request(url, options, response => {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failiure.html");
    }

    response.on("data", data => {
      console.log(JSON.parse(data));
    });
  });

  request.write(JSON.stringify(data));
  request.end();
});

app.listen(process.env.PORT || 3000, () => console.log("listening on 3000"));

// uid
// 9a0bb1d406

// api
// b31a95f253463bc33017d0e9e9e2fc95-us17
