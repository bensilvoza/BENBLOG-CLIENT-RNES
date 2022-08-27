// libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// contexts
import { NotificationContext } from "../../contexts/shared/notificationContext";

// components
import Spacer from "../shared/spacer";

// utils
import uid from "../../utils/shared/uid";

function Form() {
  const navigate = useNavigate();

  // contexts
  let { handleNotification } = useContext(NotificationContext);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function handleClickLogIn() {
    return navigate("/login");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    let user = {
      userId: uid(),
      name: name,
      email: email,
      password: password,
    };

    if (password != confirmPassword) {
      handleNotification("Passwords do not match", "darkred");

      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);

      return;
    }

    // communicate to BENBLOG-SERVER-RNES
    let response = await axios.post("http://localhost:5000/register", user);

    if (response["data"]["message"] == "OK") {
      // reset state
      setName("");
      setEmail("");
      setConfirmPassword("");
      setPassword("");

      handleNotification("Registered successfully", "darkgreen");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);
    } else if (response["data"]["message"] == "nameAlreadyExist") {
      handleNotification("Name already exist", "darkred");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);
    } else {
      handleNotification("Something went wrong", "darkred");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);
    }

    return;
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <Input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />

      <Spacer height="1rem" />

      <Input
        required
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <Spacer height="1rem" />

      <Input
        required
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <Spacer height="1rem" />

      <Input
        required
        value={confirmPassword}
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm password"
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
        CREATE ACCOUNT
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
        LOG IN
      </Button>
    </form>
  );
}

export default Form;
