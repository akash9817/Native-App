const express = require("express");
const User = require("../models/user");
const fs = require('fs');
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = new express.Router();

router.post("/signup", upload.single("thumbnail"), async (req, res) => {
  const user = new User(req.body);
  var path = "/images/default.png";
  if (req.file) {
    path = req.file.destination.slice(6) + "/" + req.file.filename;
  }
  try {
    const token = await user.generateAuthToken();
    user.image = path;
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", upload.single('thumbnail'), async (req, res) => {
  // console.log("req,body  " + req.body);
  // console.log("req,body  " + req.body.email);
  // console.log("req,body  " + req.body.image);
  // console.log("req,body  " + req.body.token);
  console.log("req.file  " + req.file)
  try {
    var user, token;
    if (req.body.auth !== undefined) {

      var isExist = await User.findOne({ "email": req.body.email });
      var path = "/images/default.png";
          if (req.file) {
            path = req.file.destination.slice(6) + "/" + req.file.filename;
          }
          if (isExist == null) {
            user = await User({
              name : req.body.name,
              email: req.body.email,
              image: path,
            });
            token = await user.generateAuthToken();
            await user.save();
          } else {
            user = isExist;
            try {
              fs.unlinkSync(`public/${user.image}`)
              //file removed
            } catch(err) {
              console.error(err)
            }
            user.image = path 
            token = await user.generateAuthToken();
            await user.save()
          }
    } else {
      user = await User.fetchByCredentials(req.body.email, req.body.password);
      console.log(user);
      token = await user.generateAuthToken();
    }
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "unable to login" });
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/user", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/user", auth, upload.single("thumbnail"), async (req, res) => {
  //console.log("req.file  "  + req.file)
  var path = "/images/default.png";
  if (req.file !== undefined) {
    path = req.file.destination.slice(6) + "/" + req.file.filename;
    console.log("path " + path);
  }
  const updates = Object.keys(req.body);
  console.log("updates " + updates);
  const allowUpates = ["name", "email", "thumbnail"];
  const allowedOperation = updates.every((update) =>
    allowUpates.includes(update)
  );
  console.log("allowUpdates  " + allowedOperation);

  if (!allowedOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    console.log("req.user " + req.user);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    console.log("req.user " + req.user);
    req.user.image = path;
    console.log("req.user " + req.user);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get(`/xyz`, async (req, res) => {
  try {
    const x = await User.findOne({ email: "akash9817@gmail.com" });
    console.log(x);
  } catch (e) {
    console.log(e);
  }
});

// router.post('/updateUser', async (req, res) => {
//     console.log(req.body)
//     const updates = Object.keys(req.body)
//     console.log("updates " + updates)

// })

module.exports = router;
