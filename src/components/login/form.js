// libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// contexts
import { NotificationContext } from "../../contexts/shared/notificationContext";
import { UserContext } from "../../contexts/shared/userContext";

// components
import Spacer from "../shared/spacer";

// utils
import uid from "../../utils/shared/uid";

function Form() {
  const navigate = useNavigate();

  // contexts
  let { handleNotification } = useContext(NotificationContext);
  let { handleUserData } = useContext(UserContext);

  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  function handleClickRegister() {
    return navigate("/register");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    let user = {
      name: name,
      password: password,
    };

    // communicate to BENBLOG-SERVER-RNES
    let response = await axios.post("http://localhost:5000/login", user);

    if (response["data"]["message"] == "ERROR") {
      handleNotification("Incorrect credentials", "darkred");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);
    } else {
      // save JWT to localStorage
      localStorage.setItem(
        "jwt",
        JSON.stringify(`Bearer ${response["data"]["token"]}`)
      );

      // update user context
      handleUserData(response["data"]["user"]);

      // reset state
      setName("");
      setPassword("");

      handleNotification("Logged in successfully", "darkgreen");
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
        onClick={handleClickRegister}
      >
        REGISTER
      </Button>
    </form>
  );
}

export default Form;
