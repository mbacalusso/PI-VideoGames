const { Router } = require("express");
const { Genre, YOUR_API_KEY } = require("../db");
const axios = require("axios");
const router = Router();

// get all genres
router.get("/", async (req, res, next) => {
  try {
    const genre = await axios.get(
      `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
    );
    
    const countGenre = await Genre.count(); // count() returns a single number type value that represents the number of rows matching your COUNT condition.

    if (countGenre === 0) {
      const apiGenres = genre.data.results
        .map((genre) => genre.name)
        .map((genres) => {
          return { name: genres };
        });
      await Genre.bulkCreate(apiGenres); // bulkCreate() method allows you to insert multiple records to your database table with a single function call.
    }

    const getGenres = await Genre.findAll();

    res.status(200).json(getGenres);
  } catch (error) {
    next(error);
  }
});

// post genre
/* router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(404).send("El nombres es un dato obligatorio");
    } else {
      const createGenre = await Genre.create(req.body);
      res.status(201).json(createGenre);
    }
  } catch (error) {
    next(error);
  }
}); */

module.exports = router;
