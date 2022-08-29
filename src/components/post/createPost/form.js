// libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, KIND } from "baseui/button";
import { Select } from "baseui/select";

// contexts
import { UserContext } from "../../../contexts/shared/userContext";
import { NotificationContext } from "../../../contexts/shared/notificationContext";
import { PostsContext } from "../../../contexts/shared/postsContext";

// components
import Spacer from "../../shared/spacer";
import WidthSpacer from "../../shared/widthSpacer";

// utils
import uid from "../../../utils/shared/uid";

function Form() {
  const navigate = useNavigate();

  // contexts
  let { userData } = useContext(UserContext);
  let { handleNotification } = useContext(NotificationContext);
  let { postsData, handlePostsData } = useContext(PostsContext);

  let [title, setTitle] = useState("");
  let [date, setDate] = useState(moment().format("ll"));
  let [readTimeValue, setReadTimeValue] = useState([]);
  let [description, setDescription] = useState("");

  function handleClickCancel() {
    return navigate("/");
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
      userId: userData["userId"],
      postId: uid(),
      title: title,
      dateCreated: date,
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
      "http://localhost:5000/post/create",
      post,
      config
    );

    if (response["data"]["message"] == "OK") {
      // reset state
      setTitle("");
      setReadTimeValue([]);
      setDescription("");

      handleNotification("Post created!", "darkgreen");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);

      // update posts context
      var postsDataCopy = [...postsData];
      postsDataCopy.push(post);
      handlePostsData(postsDataCopy);
    }
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <Spacer height="1rem" />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <Input value={`Date Published: ${date}`} />
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
          <Button kind={KIND.secondary} onClick={handleClickCancel}>
            Cancel
          </Button>
          <WidthSpacer width=".5rem" />
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  );
}

export default Form;
