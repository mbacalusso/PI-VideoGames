const { Router } = require("express");
const videogameRoute = require("./videogame");
const genreRoute = require("./genre");
const router = Router();

router.use("/videogame", videogameRoute);
router.use("/genre", genreRoute);

// get all platforms
const { apiGames } = require("./tools");
router.get("/platforms", async (req, res) => {
  const games = await apiGames();
  const allPlatforms = [];
  games.map((game) => {
    game.platforms.map((platform) => {
      if (!allPlatforms.includes(platform)) {
        allPlatforms.push(platform);
      }
    });
  });
  allPlatforms.length
    ? res.status(200).json(allPlatforms)
    : res.status(404).send("Error");
});

module.exports = router;
