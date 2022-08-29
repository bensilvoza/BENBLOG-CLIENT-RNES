// libraries
import { useContext } from "react";

// contexts
import { UserContext } from "../../contexts/shared/userContext";

// components
import EditAndDeleteButton from "./editAndDeleteButton";

function Card(props) {
  // contexts
  let { userData } = useContext(UserContext);

  return (
    <>
      <h1
        style={{
          fontWeight: "900",
          color: "gray",
        }}
      >
        {props["title"]}
      </h1>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0", color: "gray" }}>{props["dateCreated"]}</p>
        <p
          style={{
            marginLeft: ".5rem",
            marginRight: ".5rem",
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
      {userData != undefined && userData["userId"] == props["userId"] && (
        <EditAndDeleteButton />
      )}
      <p style={{ marginTop: ".5rem" }}>{props["description"]}</p>
    </>
  );
}

export default Card;
