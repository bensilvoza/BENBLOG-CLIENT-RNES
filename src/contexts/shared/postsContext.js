import { useState, createContext } from "react";

export const PostsContext = createContext();

function PostsContextProvider(props) {
  let [postsData, setPostsData] = useState(undefined);

  function handlePostsData(posts) {
    setPostsData(posts);
    return;
  }

  return (
    <PostsContext.Provider
      value={{
        postsData: postsData,
        handlePostsData: handlePostsData,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
