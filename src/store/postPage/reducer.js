const initialState = {
  loading: true,
  post: null,
  comments: [],
};

export default function postPageSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "postPage/startLoading": {
      return {
        loading: true,
        post: null,
        comments: [],
      };
    }
    case "postPage/postFetched": {
      return {
        loading: false,
        post: action.payload.post,
        comments: action.payload.comments,
      };
    }
    default: {
      return state;
    }
  }
}
