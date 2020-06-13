const Clarifai = require("clarifai");

// Initialise api key

const app = new Clarifai.App({
  apiKey: "0ce73bc6440a41aab6f0ca66acedb108",
});

const apiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to find the face"));
};

const updateImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("failed to get entries"));
};

module.exports = {
  updateImage,
  apiCall,
};
