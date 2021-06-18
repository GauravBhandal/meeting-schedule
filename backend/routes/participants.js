const router = require("express").Router();
let Participants = require("../models/participants.model");

router.route("/").get((req, res) => {
  Participants.find()
    .then((participants) => res.json(participants))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const meeting = req.body.meeting;
  const newParticipants = new Participants({
    username,
    email,
    meeting,
  });

  newParticipants
    .save()
    .then(() => res.json("Participant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Participants.findById(req.params.id)
    .then((participant) => res.json(participant))
    .then((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Participants.findById(req.params.id)
    .then((participant) => {
      participant.meeting = req.body.meeting;

      participant
        .save()
        .then(() => res.json("Participant details updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => err.status(400).json("Error: " + err));
});

module.exports = router;
