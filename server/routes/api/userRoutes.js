const router = require("express").Router();
const { route } = require(".");
const { User, Thought } = require("../../models");

router.get("/", (req, res) => {
  User.find().then((userResponse) => {
    res.json(userResponse);
  });
});

router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("friends")
    .populate("thoughts")
    .then((userResponse) => {
      res.json(userResponse);
    });
});

router.post("/", (req, res) => {
    User.create(req.body).then((userCreate) => {
         res.json(userCreate);
    })

})

router.put("/:id", (req, res)=> {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}  //make sure to return the new user
    ).then((userResponse)=> {
        res.json(userResponse);
    });
})

router.delete("/:id", (req, res)=> {
    User.findOneAndDelete(
        {_id: req.params.id}
    ).then((userResponse)=>{
        Thought.deleteMany({username: userResponse.username})
        .then(()=> {
          res.json(userResponse)
        })
      //  res.json(userResponse);
    });

})

router.post("/:userId/friends/:friendId", (req, res)=> {

})
router.delete("/:userId/friends/:friendId", (req, res)=> {
    
})
module.exports = router;
