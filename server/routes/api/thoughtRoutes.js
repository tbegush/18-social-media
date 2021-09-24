const router = require("express").Router();
const { route } = require(".");
const { User, Thought, Reaction } = require("../../models");

router.get("/", (req, res) => {
  Thought.find().then((thoughtResponse) => {
    res.json(thoughtResponse);
  });
});

router.get("/:id", (req, res) => {
  Thought.findOne({ _id: req.params.id })
    //   .populate("friends")
    //   .populate("thoughts")
    .then((thoughtResponse) => {
      res.json(thoughtResponse);
    });
});

router.post("/", (req, res) => {
  Thought.create(req.body).then((thoughtCreate) => {
    User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: [thoughtCreate.id] } },
      { new: true }
    ).then(() => {
      res.json(thoughtCreate);
    });
  });
});

router.put("/:id", (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true } //make sure to return the new thought
  ).then((thoughtResponse) => {
    res.json(thoughtResponse);
  });
});

router.delete("/:id", (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.id }).then((thoughtResponse) => {
    res.json(thoughtResponse);
  });
});

router.post("/:thoughtId/reactions", (req, res) => {
  const reaction = new Reaction(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: [reaction] } },
    { new: true }
  ).then((reactionCreate) => {
    res.json(reactionCreate);
  });
});

router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
  ).then((reactionResponse) => {
    res.json(reactionResponse);
  });
});

module.exports = router;
