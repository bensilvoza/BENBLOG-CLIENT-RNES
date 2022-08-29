// libraries
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, KIND } from "baseui/button";
import { Select } from "baseui/select";

// contexts
import { NotificationContext } from "../../contexts/shared/notificationContext";
import { PostsContext } from "../../contexts/shared/postsContext";

// components
import Spacer from "../shared/spacer";
import WidthSpacer from "../shared/widthSpacer";

function Form() {
  const navigate = useNavigate();
  const { id } = useParams();

  // contexts
  let { handleNotification } = useContext(NotificationContext);
  let { postsData, handlePostsData } = useContext(PostsContext);

  let [userId, setUserId] = useState("");
  let [postId, setPostId] = useState("");
  let [title, setTitle] = useState("");
  let [dateCreated, setDateCreated] = useState(moment().format("ll"));
  let [readTimeValue, setReadTimeValue] = useState([]);
  let [description, setDescription] = useState("");

  function handleClickCancelEdit() {
    navigate("/post/" + postId);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    // All fields required
    if (title == "" || readTimeValue.length == 0 || description == "") {
      handleNotification("Please fill out all fields", "darkred");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);

      return;
    }

    let post = {
      userId: userId,
      postId: postId,
      title: title,
      dateCreated: dateCreated,
      readTime: Number(readTimeValue[0]["id"]),
      description: description,
    };

    // communicate to BENBLOG-SERVER-RNES

    // JWT
    let token = JSON.parse(localStorage.getItem("jwt"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    let response = await axios.post(
      `http://localhost:5000/post/edit/${postId}`,
      post,
      config
    );

    if (response["data"]["message"] == "OK") {
      handleNotification("Post updated!", "darkgreen");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);

      let postsDataCopy = [...postsData];
      for (let i = 0; i < postsDataCopy.length; i++) {
        if (postsDataCopy[i]["postId"] == postId) {
          postsDataCopy[i] = post;

          // update posts context
          handlePostsData(postsDataCopy);

          navigate("/post/" + postId);
        }
      }
    }
    return;
  }

  useEffect(function () {
    let postsDataCopy = [...postsData];
    let postId = id;
    for (let i = 0; i < postsDataCopy.length; i++) {
      if (postsDataCopy[i]["postId"] == postId) {
        let post = postsDataCopy[i];

        setUserId(post["userId"]);
        setPostId(post["postId"]);
        setTitle(post["title"]);
        setDateCreated(post["dateCreated"]);
        setReadTimeValue([
          { id: post["readTime"], value: `${post["readTime"]} min read` },
        ]);
        setDescription(post["description"]);

        return;
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmitForm}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <Spacer height="1rem" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "48%" }}>
          <Input value={`Date Published: ${dateCreated}`} />
        </div>
        <div style={{ width: "48%" }}>
          <Select
            options={[
              { id: "1", value: "1 min read" },
              { id: "2", value: "2 min read" },
              { id: "5", value: "5 min read" },
              { id: "10", value: "10 min read" },
              { id: "15", value: "15 min read" },
              { id: "20", value: "20 min read" },
            ]}
            searchable={false}
            placeholder="reading time"
            labelKey="value"
            valueKey="value"
            onChange={(params) => setReadTimeValue(params.value)}
            value={readTimeValue}
          />
        </div>
      </div>

      <Spacer height="1rem" />

      <Textarea
        overrides={{
          InputContainer: {
            style: {
              height: "20rem",
            },
          },
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write here..."
      />

      <Spacer height="1rem" />

      <div style={{ display: "flex" }}>
        <Button kind={KIND.secondary} onClick={handleClickCancelEdit}>
          Cancel
        </Button>
        <WidthSpacer width=".5rem" />
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}

export default Form;
