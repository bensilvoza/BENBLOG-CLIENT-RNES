// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// components
import Spacer from "../shared/spacer";

// utils
import uid from "../../utils/shared/uid";

function Form() {
  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function handleClickLogIn() {
    return navigate("/login");
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    // let post = {
    //   userId: "wedeTfRdP",
    //   postId: uid(),
    //   title: title,
    //   dateCreated: new Date().getTime(),
    //   readTime: Number(readTimeValue[0]["id"]),
    //   description: description,
    // };

    // console.log(post);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />

      <Spacer height="1rem" />

      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <Spacer height="2rem" />

      <Button
        overrides={{
          BaseButton: {
            style: {
              width: "100%",
            },
          },
        }}
        type="submit"
      >
        LOGIN
      </Button>

      <Spacer height=".5rem" />

      <Button
        overrides={{
          BaseButton: {
            style: {
              width: "100%",
            },
          },
        }}
        kind={KIND.secondary}
        onClick={handleClickLogIn}
      >
        REGISTER
      </Button>
    </form>
  );
}

export default Form;
