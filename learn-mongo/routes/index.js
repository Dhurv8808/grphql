const express = require("express");
const router = express.Router();
const { signUp, getAllUsers } = require("../handlers/auth");

router.post("/auth/signup", signUp);
router.get("/getAllUser", getAllUsers);

router.get('/', (req, res) => {
  res.status(200).send('API server');
});

// router.post("/auth/signin", signin);

// module.exports = function (app) {
//   app.get('/', (req, res) => {
//     res.status(200).send('API server');
//   });
//   app.post("/auth/signup", (req, res) => signUp(req, res));
// }

module.exports = router;
