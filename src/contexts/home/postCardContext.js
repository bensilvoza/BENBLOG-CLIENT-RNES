import { useState, createContext } from "react";

export const PostCardContext = createContext();

function PostCardContextProvider(props) {
  var [currentPostId, setCurrentPostId] = useState(undefined);

  function handleCurrentPostId(postId) {
    setCurrentPostId(postId);
  }

  return (
    <PostCardContext.Provider
      value={{
        currentPostId: currentPostId,
        handleCurrentPostId: handleCurrentPostId,
      }}
    >
      {props.children}
    </PostCardContext.Provider>
  );
}

export default PostCardContextProvider;
