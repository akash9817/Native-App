const express = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const multer = require("multer");
const UploadData = require("../models/upload");
const router = express.Router();
const upload = require('../middleware/upload')


router.post("/course", upload.single("thumbnail"), async (req, res) => {
  var path = req.file.destination.slice(6) + "/" + req.file.filename;
  console.log(path);
  const course = new Course({
    name: req.body.name,
    thumbnail: req.body.name,
  });
  try {
    course.thumbnail = path;
    await course.save();
    res.status(201).send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/course", auth, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/course/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "thumbnail"];
  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const course = await Course.findById({ _id: req.params.id });

    if (!course) {
      return res.status(404).send();
    }
    updates.forEach((update) => (course[update] = req.body[update]));
    await course.save();
    res.send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/course/:id", async (req, res) => {
  console.log("I am gre===");
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id });
    console.log(course);
    if (!course) {
      return res.status(404).send({
        err: "err",
      });
    }

    res.send(course);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
