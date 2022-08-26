// libraries
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { PostCardContext } from "../../contexts/home/postCardContext";

function Card(props) {
  const navigate = useNavigate();

  // contexts
  let { handleCurrentPostId } = useContext(PostCardContext);

  function handleClickPost(id) {
    handleCurrentPostId(undefined);
    return navigate("/post/" + id);
  }

  return (
    <div
      onClick={function () {
        handleClickPost(props["postId"]);
      }}
      onMouseEnter={function () {
        handleCurrentPostId(props["postId"]);
      }}
      onMouseLeave={function () {
        handleCurrentPostId(undefined);
      }}
      style={props["cardStyle"]}
    >
      <h5
        style={{
          fontFamily: "montserrat",
          fontWeight: "900",
          margin: "0",
          color: "gray",
        }}
      >
        {props["title"]}
      </h5>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0", color: "gray" }}>{props["dateCreated"]}</p>
        <p
          style={{
            marginLeft: ".5rem",
            marginRight: ".5rem",
            marginBottom: ".3rem",
            color: "gray",
          }}
        >
          {" "}
          •{" "}
        </p>
        <p style={{ margin: "0", color: "gray" }}>
          {props["readTime"]} ☕️ min read
        </p>
      </div>
      <p>{props["description"]}</p>
    </div>
  );
}

export default Card;
