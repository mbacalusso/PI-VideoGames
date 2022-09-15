const axios = require("axios");
const { Videogame, Genre, YOUR_API_KEY } = require("../db");

// get api
const apiGames = async () => {
  try {
    let gamesApi = await Promise.all([
      axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=1&page_size=50`
      ),
      axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2&page_size=50`
      ),
      axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3&page_size=50`
      ),
    ]);

    const page1 = gamesApi[0].data.results;
    const page2 = gamesApi[1].data.results;
    const page3 = gamesApi[2].data.results;

    gamesApi = page1.concat(page2).concat(page3);

    gamesApi = gamesApi.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms?.map((plat) => plat.platform.name),
        background_image: game.background_image,
        genres: game.genres?.map((gen) => {
          return {
            id: gen.id,
            name: gen.name,
          };
        }),
        inDB: false,
      };
    });

    return gamesApi;
  } catch (error) {
    console.log(error);
  }
};

// get db
const dbGames = async () => {
  try {
    const dbGames = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return dbGames;
  } catch (error) {
    console.log(error);
  }
};

const allGames = async () => {
  try {
    const gamesAPI = await apiGames();
    const gamesDB = await dbGames();
    const gamesTotal = gamesAPI.concat(gamesDB);
    return gamesTotal;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  apiGames,
  dbGames,
  allGames,
};
