import axios from "axios";

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const games = await axios.get("http://localhost:3001/api/videogame");
      return dispatch({
        type: GET_ALL_GAMES,
        payload: games.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGamesByName = (name) => {
  return async (dispatch) => {
    try {
      const games = await axios.get(
        `http://localhost:3001/api/videogame?search=${name}`
      );
      return dispatch({
        type: SEARCH_NAME_GAME,
        payload: games.data,
      });
    } catch (error) {
      console.log(error);
      return alert("Game was not found");
    }
  };
};

export const getGamesDetails = (id) => {
  return async (dispatch) => {
    try {
      const games = await axios.get(
        `http://localhost:3001/api/videogame/${id}`
      );
      return dispatch({
        type: GET_GAMES_DETAILS,
        payload: games.data,
      });
    } catch (error) {
      return alert("Game was not found");
    }
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get("http://localhost:3001/api/platforms");
      return dispatch({
        type: GET_PLATFORMS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGamesGenres = () => {
  return async (dispatch) => {
    try {
      const games = await axios.get("http://localhost:3001/api/genre");
      return dispatch({
        type: GET_GENRES,
        payload: games.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setGamesOrder = (order) => {
  return {
    type: SET_FILTER_GAMES_ORDER,
    payload: order,
  };
};

export const setGamesRating = (rating) => {
  return {
    type: SET_FILTER_GAMES_RATING,
    payload: rating,
  };
};

export const setGamesGenres = (genre) => {
  return {
    type: SET_FILTER_GAMES_GENRES,
    payload: genre,
  };
};

export const setGamesOrigin = (origin) => {
  return {
    type: SET_FILTER_GAMES_ORIGIN,
    payload: origin,
  };
};

export const createGame = (data) => {
  return async (dispatch) => {
    try {
      const newGame = await axios.post(
        "http://localhost:3001/api/videogame",
        data
      );
      return dispatch({
        type: CREATE_GAME,
        payload: newGame.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearGameState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_VIDEOGAME_STATE });
  };
};

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const SEARCH_NAME_GAME = "SEARCH_NAME_GAME";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMES_DETAILS = "GET_GAMES_DETAILS";
export const SET_FILTER_GAMES_ORDER = "SET_FILTER_GAMES_ORDER";
export const SET_FILTER_GAMES_ORIGIN = "SET_FILTER_GAMES_ORIGIN";
export const SET_FILTER_GAMES_GENRES = "SET_FILTER_GAMES_GENRES";
export const SET_FILTER_GAMES_RATING = "SET_FILTER_GAMES_RATING";
export const CREATE_GAME = "CREATE_GAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const CLEAR_VIDEOGAME_STATE = "CLEAR_VIDEOGAME_STATE";
