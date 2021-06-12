const router = require("express").Router();
let Exercise = require("../models/exercise.models");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const startDate = req.body.startDate;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const participants = req.body.participants;

  const newExercise = new Exercise({
    startDate,
    startTime,
    endTime,
    participants,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .then((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.startDate = req.body.startDate;
      exercise.startTime = req.body.startTime;
      exercise.endTime = req.body.endTime;
      exercise.participants = req.body.participants;

      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => err.status(400).json("Error: " + err));
});

module.exports = router;
