// libraries
import { useContext } from "react";

// contexts
import { PostCardContext } from "../../contexts/home/postCardContext";

// components
import Card from "./card";
import Spacer from "../shared/spacer";

// utils
import cardStyle from "../../utils/home/cardStyle";

// test
import posts from "../../test/posts";

function Posts() {
  // contexts
  let { currentPostId } = useContext(PostCardContext);

  let postsCopy = [...posts];

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
