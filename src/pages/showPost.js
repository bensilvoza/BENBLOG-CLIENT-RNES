// libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";

// components
import Spacer from "../components/shared/spacer";
import Card from "../components/showPost/card";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

// test
import posts from "../test/posts";

function ShowPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  let [post, setPost] = useState({});

  function handleClickBackArrow() {
    return navigate("/");
  }

  useEffect(function () {
    setPost(posts[id - 1]);
    return;
  }, []);

  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Cell span={6}>
        <Spacer height="1rem" />
        <div
          style={{ fontSize: "1.5rem", cursor: "pointer", color: "gray" }}
          onClick={handleClickBackArrow}
        >
          <i className="bi bi-arrow-left"></i>
        </div>
        <Spacer height="4rem" />
        <Card
          title={post["title"]}
          dateCreated={post["dateCreated"]}
          readTime={post["readTime"]}
          description={post["description"]}
        />

        <Spacer height="1rem" />
      </Cell>
    </Grid>
  );
}

export default ShowPost;
