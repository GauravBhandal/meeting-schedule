const router = require("express").Router();
const nodemailer = require("nodemailer");
let Exercise = require("../models/exercise.models");
let Participants = require("../models/participants.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});
const sendMail = (participant, startDate, startTime, endTime) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "bhandalgaurav1999@gmail.com",
      pass: "Githubeducation@123",
    },
  });
  const mailOptions = {
    from: "bhandalgaurav1999@gmail.com",
    to: `${participant.email}`,
    subject: "Regarding the meeting scheduled with scaler",
    text: `Your meeting will be started from ${startDate} from ${startTime} to ${endTime}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
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
  Promise.all(
    participants.map(
      (id) =>
        new Promise((resolve, reject) => {
          Participants.find({ _id: id }, function (err, participant) {
            if (!err) {
              const isColliding = participant[0].meeting.filter(
                (parti) =>
                  parti.date === startDate &&
                  (parti.startTime === startTime ||
                    parti.endTime === endTime ||
                    (parti.startTime > startTime &&
                      parti.startTime < endTime) ||
                    (parti.endTime > startTime && parti.endTime < endTime))
              ).length;
              if (isColliding) {
                reject("Time is colliding");
              } else {
                resolve({ participant: participant[0] });
              }
            }
          });
        })
    )
  )
    .then((arrayOfresponses) => {
      arrayOfresponses.forEach((response) => {
        sendMail(response.participant, startDate, startTime, endTime);
        const memberData = [
          ...response.participant.meeting,
          {
            startTime,
            endTime,
            date: startDate,
          },
        ];
        response.participant.meeting = memberData;
        response.participant
          .save()
          .then(() => res.json("Participant details updated"))
          .catch((err) => res.status(400).json("Error :" + err));
      });
      newExercise
        .save()
        .then(() => res.json("Exercise added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Time is colliding"));
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

      Promise.all(
        exercise.participants.map(
          (id) =>
            new Promise((resolve, reject) => {
              Participants.find({ _id: id }, function (err, participant) {
                if (!err) {
                  const isColliding = participant[0].meeting.filter(
                    (parti) =>
                      parti.date === exercise.startDate &&
                      (parti.startTime === exercise.startTime ||
                        parti.endTime === exercise.endTime ||
                        (parti.startTime > exercise.startTime &&
                          parti.startTime < exercise.endTime) ||
                        (parti.endTime > exercise.startTime &&
                          parti.endTime < exercise.endTime))
                  ).length;
                  if (isColliding) {
                    reject("Time is colliding");
                  } else {
                    resolve({ participant: participant[0] });
                  }
                }
              });
            })
        )
      )
        .then((arrayOfresponses) => {
          arrayOfresponses.forEach((response) => {
            sendMail(
              response.participant,
              exercise.startDate,
              exercise.startTime,
              exercise.endTime
            );
            const memberData = [
              ...response.participant.meeting,
              {
                startTime: exercise.startTime,
                endTime: exercise.endTime,
                date: exercise.startDate,
              },
            ];
            response.participant.meeting = memberData;
            response.participant
              .save()
              .then(() => res.json("Participant details updated"))
              .catch((err) => res.status(400).json("Error :" + err));
          });
          exercise
            .save()
            .then(() => res.json("Meeting schedule updated successfully!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Time is colliding"));
    })
    .catch((err) => err.status(400).json("Error: " + err));
});

module.exports = router;
