import {
  GET_ALL_GAMES,
  SEARCH_NAME_GAME,
  GET_GENRES,
  GET_GAMES_DETAILS,
  SET_FILTER_GAMES_ORDER,
  SET_FILTER_GAMES_ORIGIN,
  SET_FILTER_GAMES_GENRES,
  SET_FILTER_GAMES_RATING,
  CREATE_GAME,
  GET_PLATFORMS,
  CLEAR_VIDEOGAME_STATE,
} from "./actions";

const initialState = {
  games: [],
  allGames: [],
  gamesGenres: [],
  filteredGames: [],
  platforms: [],
  gamesDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
        filteredGames: action.payload,
      };

    case SEARCH_NAME_GAME:
      return {
        ...state,
        games: action.payload,
      };

    case GET_GAMES_DETAILS:
      return {
        ...state,
        gamesDetails: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        gamesGenres: action.payload,
      };

    case SET_FILTER_GAMES_ORDER:
      let ordererByName = [...state.games];
      ordererByName = ordererByName.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "asc" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "desc" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        games: ordererByName,
      };

    case SET_FILTER_GAMES_RATING:
      let orderByRating = [...state.games];
      orderByRating = orderByRating.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === "low" ? -1 : 1;
        }
        if (a.rating > b.rating) {
          return action.payload === "top" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        games: orderByRating,
      };

    case SET_FILTER_GAMES_GENRES:
      const genre = action.payload;
      if (genre === "All")
        return {
          ...state,
          games: state.allGames,
          filteredGames: state.allGames,
        };
      else {
        let gamesFiltered = state.allGames?.filter((game) => {
          return game.genres?.map((genre) => genre.name).includes(genre);
        });
        return {
          ...state,
          games: gamesFiltered,
          filteredGames: gamesFiltered,
        };
      }

    case SET_FILTER_GAMES_ORIGIN: {
      if (action.payload === "VideogamesDB") {
        return {
          ...state,
          games: state.filteredGames?.filter((game) => {
            return game.inDB === true;
          }),
        };
      } else if (action.payload === "RawgAPI") {
        return {
          ...state,
          games: state.filteredGames?.filter((game) => {
            return game.inDB === false;
          }),
        };
      } else {
        return {
          ...state,
          games: state.filteredGames,
        };
      }
    }

    case CREATE_GAME: {
      return {
        ...state,
      };
    }

    case CLEAR_VIDEOGAME_STATE: {
      return {
        ...state,
        gamesDetails: [],
        filteredGames: [],
        games: [],
      };
    }

    default:
      return state;
  }
}
