// libraries
import { useState, useEffect, useContext } from "react";

// contexts
import { PostCardContext } from "../../contexts/home/postCardContext";
import { PostsContext } from "../../contexts/shared/postsContext";

// components
import Card from "./card";
import Spacer from "../shared/spacer";

// utils
import cardStyle from "../../utils/home/cardStyle";

function Posts() {
  // contexts
  let { currentPostId } = useContext(PostCardContext);
  let { postsData } = useContext(PostsContext);

  let [postsCopy, setPostsCopy] = useState([]);

  useEffect(function () {
    if (postsCopy.length == 0) {
      if (postsData != undefined) {
        setPostsCopy([...postsData]);
      }
    }

    return;
  });

  return (
    <>
      {postsCopy.map(function (post) {
        return (
          <div key={post["postId"]}>
            <Card
              postId={post["postId"]}
              title={post["title"]}
              dateCreated={post["dateCreated"]}
              readTime={post["readTime"]}
              description={post["description"].substring(0, 240)}
              cardStyle={post["postId"] == currentPostId ? cardStyle : {}}
            />
            <Spacer height="1rem" />
          </div>
        );
      })}
    </>
  );
}

export default Posts;
