import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import "./PostsFeed.css";
import React from "react";

const API_URL = `https://codaisseur-coders-network.herokuapp.com/posts`;

const PostsFeed = () => {
  const [data, setData] = useState({
    loading: false,
    posts: [],
  });

  async function fetchNext5Posts() {
    setData({ ...data, loading: true });

    const response = await axios.get(
      `${API_URL}/?offset=${data.posts.length}&limit=5`
    );
    console.log(response);

    const morePosts = response.data.rows;

    setData({
      loading: false,
      posts: [...data.posts, ...morePosts],
    });
  }

  useEffect(() => {
    fetchNext5Posts();
  }, []);

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>
      {data.posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p className="meta">
              {moment(post.createdAt).format("DD-M-YYYY")} &bull;{" "}
              {/*{post.post_likes.length} likes &bull;{" "} */}
              <span className="tags">
                {post.tags.map((tag) => {
                  return (
                    <React.Fragment key={tag.id}>
                      <span className="Tag">{tag.tag}</span>
                    </React.Fragment>
                  );
                })}
              </span>
            </p>
          </div>
        );
      })}
      <p>
        {data.loading ? (
          <em>Loading...</em>
        ) : (
          <button onClick={fetchNext5Posts}>Load more</button>
        )}
      </p>
    </div>
  );
};

export default PostsFeed;
