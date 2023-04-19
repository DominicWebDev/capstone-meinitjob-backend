require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); //cross origin resource sharing
const logger = require("morgan");

const server = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://meinitjob.de",
  "https://www.meinitjob.de",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(console.log("Blocked by CORS rules: ", origin));
    }
  },
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(logger("dev"));
server.disable("etag");
server.set("json spaces", 4);

server.get("/", function rootHandler(request, response) {
  response.status(200).json({
    message: `Welcome to the ${process.env.DEPLOYMENT} environment API of meinitjob!`,
  });
});
const companiesRouter = require("./api/resources/companies/companies-router");
const skillsRouter = require("./api/resources/skills/skills-router");
const usersRouter = require("./api/resources/users/users-router");

server.use("/v1/users", usersRouter);
server.use("/v1/companies", companiesRouter);
server.use("/v1/skills", skillsRouter);

module.exports = server;
