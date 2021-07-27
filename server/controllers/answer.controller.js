const Answer = require("../model/answer.model");
const Question = require("../model/question.model");

//|-}~PENDING~{-|
//Get all ANSWERS for particular QUESTION
const getAnswers = async (req, res) => {
  Answer.find().exec((err, answerData) => {
    if (err) {
      console.log(err);
    } else {
      res.send(answerData);
    }
  });
};

const createAnswer = async (req, res) => {
  const answer = new Answer();
  answer.text = req.body.name;
  answer.author = req.user;

  try {
    await answer.save().then(
      Question.findByIdAndUpdate(
        req.params.questionID,
        { $push: { answers: answer._id } },
        { new: true, useFindAndModify: false }
      ).exec((err, questionData) => {
        if (err) {
          console.log(err);
        } else {
          res.send(questionData);
        }
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
//|-}~PENDING~{-|
const renderCreateAnswer = (req, res) => {};

//|-}~PENDING~{-|
//Fetch an individual QUESTION with ANSWERS

module.exports = { getAnswers, createAnswer, renderCreateAnswer };
