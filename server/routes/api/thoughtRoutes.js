const router = require("express").Router();
const { route } = require(".");
const { User, Thought } = require("../../models");

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
    Thought.create(req.body).then((userCreate) => {
         res.json(userCreate);
    })
})

router.put("/:id", (req, res)=> {
   Thought.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}  //make sure to return the new thought
    ).then((thoughtResponse)=> {
        res.json(thoughtResponse);
    });
})

router.delete("/:id", (req, res)=> {
    Thought.findOneAndDelete(
        {_id: req.params.id}
    ).then((thoughtResponse)=>{
        res.json(userResponse);
    });

})


module.exports = router;