const { Router } = require("express");
const { Videogame, Genre, YOUR_API_KEY } = require("../db");
const {
  /* apiGames, dbGames, */ allGames /* gamesByName */,
} = require("./utils");
const axios = require("axios");
const router = Router();

// get all games and by name
router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    let allG = await allGames();

    if (search) {
      let gameQuery = allG.filter((game) =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );

      gameQuery.length
        ? res.status(200).json(gameQuery)
        : res.status(404).json(`${search} was not found`);
    } else {
      res.status(200).json(allG);
    }
  } catch (error) {
    next(error);
  }
});

// get games by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id.includes("-")) {
      const gameDb = await Videogame.findOne({
        where: { id },
        include: [Genre],
      });

      return res.status(200).json(gameDb);
    } else {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
      );

      const game = gameAPI.data;

      res.status(200).json(game);
    }
  } catch (error) {
    res.status(404).json({ error: "ID was not found." });
  }
});

// post games
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      description,
      background_image,
      released,
      rating,
      inDB,
      platforms,
      genres,
    } = req.body;

    if (!name || !description || !platforms || !genres) {
      return res.status(404).send("Data missing");
    } else {
      const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

      let gameCreated = await Videogame.create({
        name: nameUpper,
        description,
        background_image,
        released,
        rating,
        inDB,
        platforms,
      });

      let genreDB = await Genre.findAll({
        where: { name: genres },
      });

      gameCreated.addGenre(genreDB);

      res.status(201).json(gameCreated);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
