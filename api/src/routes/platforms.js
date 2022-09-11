const { Router } = require("express");
const { apiGames } = require("./utils");
const router = Router();

// get all platforms
router.get("/", async (req, res) => {
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
