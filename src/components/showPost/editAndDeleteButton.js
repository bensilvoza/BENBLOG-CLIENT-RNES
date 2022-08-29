// libraries
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, SIZE, KIND } from "baseui/button";

// contexts
import { PostsContext } from "../../contexts/shared/postsContext";
import { NotificationContext } from "../../contexts/shared/notificationContext";

// components
import WidthSpacer from "../shared/widthSpacer";

function EditAndDeleteButton() {
  const navigate = useNavigate();
  const { id } = useParams();

  // contexts
  let { postsData, handlePostsData } = useContext(PostsContext);
  let { handleNotification } = useContext(NotificationContext);

  function handleClickEditPost() {
    let postId = id;
    navigate("/post/edit/" + postId);
  }

  async function handleClickDeletePost() {
    let postId = id;

    // communicate to BENBLOG-SERVER-RNES

    // JWT
    let token = JSON.parse(localStorage.getItem("jwt"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    let response = await axios.get(
      `http://localhost:5000/post/delete/${postId}`,
      config
    );

    if (response["data"]["message"] == "OK") {
      var postsDataCopy = [...postsData];
      for (let i = 0; i < postsDataCopy.length; i++) {
        if (postsDataCopy[i]["postId"] == postId) {
          postsDataCopy.splice(i, 1);

          // update posts context
          handlePostsData(postsDataCopy);

          handleNotification("Post deleted", "darkgreen");
          setTimeout(function () {
            return handleNotification(undefined, undefined);
          }, 5000);

          navigate("/");
          return;
        }
      }
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        {" "}
        <Button size={SIZE.mini} onClick={handleClickEditPost}>
          Edit
        </Button>
      </div>
      <WidthSpacer width=".3rem" />
      <div>
        {" "}
        <Button
          size={SIZE.mini}
          kind={KIND.secondary}
          onClick={handleClickDeletePost}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditAndDeleteButton;
