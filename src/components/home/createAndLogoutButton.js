// libraries
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SIZE, KIND } from "baseui/button";

// contexts
import { UserContext } from "../../contexts/shared/userContext";
import { NotificationContext } from "../../contexts/shared/notificationContext";

// components
import WidthSpacer from "../shared/widthSpacer";

function CreateAndLogoutButton() {
  const navigate = useNavigate();

  // contexts
  let { userData, handleUserData } = useContext(UserContext);
  let { handleNotification } = useContext(NotificationContext);

  function handleNavigateCreatePage() {
    return navigate("/post/create");
  }

  function handleClickAccountStateButton() {
    if (userData == undefined) {
      return navigate("/login");
    } else {
      // on logout destroy the authorization token
      localStorage.removeItem("jwt");

      // update user context
      handleUserData(undefined);

      // send notification
      handleNotification("Logged out successfully", "darkgreen");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);
    }
    return;
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        {" "}
        <Button size={SIZE.mini} onClick={handleNavigateCreatePage}>
          Create
        </Button>
      </div>
      <WidthSpacer width=".3rem" />
      <div>
        {" "}
        <Button
          size={SIZE.mini}
          kind={KIND.secondary}
          onClick={handleClickAccountStateButton}
        >
          {userData == undefined ? "Login" : "Logout"}
        </Button>
      </div>
    </div>
  );
}

export default CreateAndLogoutButton;
