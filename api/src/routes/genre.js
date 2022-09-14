const { Router } = require("express");
const { Genre, YOUR_API_KEY } = require("../db");
const axios = require("axios");
const { json } = require("body-parser");
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

/* router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(404).json("Se necesita name");
    }
    const createGenre = await Genre.create(req.body);
    res.status(201).json(createGenre);
  } catch (error) {
    next(error);
  }
}); */

/* router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let borrar = await Genre.destroy({
      where: {
        id,
      },
    });
    res.status(200).json("Genero borrado");
  } catch (error) {
    console.log(error);
  }
}); */

module.exports = router;
