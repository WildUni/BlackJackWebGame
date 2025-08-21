/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

import express from "express";
import gamehub from "./gamehub";

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
// import socketManager from "./server-socket";

// router.post("/login", auth.login);
// router.post("/logout", auth.logout);
// router.get("/whoami", (req, res) => {
//   if (!req.user) {
//     // not logged in
//     return res.send({});
//   }

//   res.send(req.user);
// });
// router.post("/initsocket", (req, res) => {
//   // do nothing if user not logged in
//   if (req.user)
//     socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
//   res.send({});
// });

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/joinLobby", gamehub.joinLobby);


// router.get("/user", (req, res) => {
//   User.findById(req.query.userId).then((user) => {
//     console.log(req)
//     res.send(user);
//   }).catch((err) => {
//     res.status(500).send('User Not Found!');
//   });
// });