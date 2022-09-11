const { Router } = require("express");
const videogameRoute = require("./videogame");
const genreRoute = require("./genre");
const platformsRoute = require("./platforms");
const router = Router();

router.use("/videogame", videogameRoute);
router.use("/genre", genreRoute);
router.use("/platforms", platformsRoute);

module.exports = router;
