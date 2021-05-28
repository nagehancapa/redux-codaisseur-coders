import axios from "axios";

const API_URL = "https://codaisseur-coders-network.herokuapp.com";

export const startLoading = () => {
  return {
    type: "postPage/startLoading",
  };
};

export const postFetched = (data) => {
  return {
    type: "postPage/postFetched",
    payload: data,
  };
};

export function fetchPost(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading());

    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`${API_URL}/posts/${id}`),
      axios.get(`${API_URL}/posts/${id}/comments`),
    ]);

    dispatch(
      postFetched({
        post: postResponse.data,
        comments: commentsResponse.data,
      })
    );
  };
}
