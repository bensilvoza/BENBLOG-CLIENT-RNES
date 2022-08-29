// libraries
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";

// contexts
import { PostsContext } from "../../contexts/shared/postsContext";
import { NotificationContext } from "../../contexts/shared/notificationContext";

// components
import Spacer from "../../components/shared/spacer";
import Card from "../../components/post/showPost/card";
import TopCenterNotification from "../../components/shared/topCenterNotification";
import CommentSection from "../../components/post/showPost/commentSection";

// utils
import gridJustifyContentCenter from "../../utils/shared/gridJustifyContentCenter";

function ShowPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  // contexts
  let { postsData } = useContext(PostsContext);
  let { notificationMessage, notificationColor } =
    useContext(NotificationContext);

  let [post, setPost] = useState({});

  function handleClickBackArrow() {
    return navigate("/");
  }

  useEffect(function () {
    for (var i = 0; i < postsData.length; i++) {
      if (postsData[i]["postId"] == id) {
        setPost(postsData[i]);
        return;
      }
    }
  }, []);

  return (
    <>
      {notificationMessage != undefined && (
        <TopCenterNotification
          message={notificationMessage}
          color={notificationColor}
        />
      )}

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
            userId={post["userId"]}
          />

          <Spacer height="4rem" />
          <CommentSection />
          <Spacer height="1rem" />
        </Cell>
      </Grid>
    </>
  );
}

export default ShowPost;
