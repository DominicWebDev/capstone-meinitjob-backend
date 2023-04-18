require("dotenv").config();

const server = require("./server");
const db = require("./database/db");
const httpServer = require("http").createServer(server);

httpServer.listen(process.env.PORT || 5000, () =>
  db
    .raw("select 1")
    .then(() => {
      console.log("Connection to database successful.");
      console.log(
        `\n *** meinitjob API server ${process.env.DEPLOYMENT} environment running on ${process.env.SERVER_URL}:${process.env.PORT} ***\n`
      );
    })
    .catch((error) => {
      console.log("Connection to database failed. ", error);
      process.exit(1);
    })
);
