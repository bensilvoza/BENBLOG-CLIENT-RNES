// libraries
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";

// contexts
import { UserContext } from "../../contexts/shared/userContext";
import { NotificationContext } from "../../contexts/shared/notificationContext";

// components
import Spacer from "../../components/shared/spacer";
import Form from "../../components/post/createPost/form";
import TopCenterNotification from "../../components/shared/topCenterNotification";

// utils
import gridJustifyContentCenter from "../../utils/shared/gridJustifyContentCenter";

function CreatePost() {
  const navigate = useNavigate();

  // contexts
  let { userData } = useContext(UserContext);
  let { handleNotification, notificationMessage, notificationColor } =
    useContext(NotificationContext);

  useEffect(function () {
    if (userData == undefined) {
      handleNotification("Login required", "darkred");
      setTimeout(function () {
        return handleNotification(undefined, undefined);
      }, 5000);

      return navigate("/login");
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
          <Spacer height="4rem" />
          <h1 style={{ fontWeight: "900" }}>Create Post</h1>
          <Spacer height="1rem" />
          <Form />
        </Cell>
      </Grid>
    </>
  );
}

export default CreatePost;
