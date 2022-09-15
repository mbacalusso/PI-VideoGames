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

    const countGenre = await Genre.count();

    if (countGenre === 0) {
      const apiGenres = genre.data.results
        .map((genre) => genre.name)
        .map((genres) => {
          return { name: genres };
        });
      await Genre.bulkCreate(apiGenres);
    }

    const getGenres = await Genre.findAll();

    res.status(200).json(getGenres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
