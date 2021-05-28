import axios from "axios";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export function startLoading() {
  return {
    type: "feed/startLoading",
  };
}

export function postsFetched(morePosts) {
  return {
    type: "feed/postsFetched",
    payload: morePosts,
  };
}

export const fetchNext5Posts = () => async (dispatch, getState) => {
  dispatch(startLoading());

  const offset = getState().feed.posts.length;

  const response = await axios.get(`${API_URL}/posts?offset=${offset}&limit=5`);
  console.log(response);

  const morePosts = response.data.rows;

  dispatch(postsFetched(morePosts));
};
