const User = require('../models/user');

exports.signUp = async function(req, res) {
  try {
    await User.create(req.body);

    res.status(201).send("User created sucessfully");
  } catch(err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

exports.getAllUsers = async function(req, res) {
  try {
    const data = await User.find({});

    res.status(200).send({data});
  } catch(err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

exports.getUsersById = async function(req, res) {
  try {
    const data = await User.findOne({_id: req.params.id});

    res.status(200).send(data);
  } catch(err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
