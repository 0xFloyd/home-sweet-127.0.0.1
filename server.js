require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const app = express();
const router = express.Router();
const fetch = require("node-fetch");
const requestIp = require("request-ip");

//console.log(process.env.REACT_APP_MAPS_API_KEY);
app.use(express.json());
app.use(express.static("client/build"));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

let ipInfoToken = process.env.ipinfoToken;

app.get("/api", (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  console.log(clientIp);
  let url = `https://ipinfo.io/${clientIp}?token=${ipInfoToken}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
  /*
  speedtest
    .getSpeed()
    .then(s => {
      console.log(`Speed: ${s} Mbps`);
    })
    .catch(e => {
      console.error(e.message);
    });*/
});

app.post("/api", (req, res) => {
  //console.log(req.body.body);
  let domain = req.body.body;
  let url = `http://ip-api.com/json/${domain}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

/*
app.post("/api", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});*/
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
