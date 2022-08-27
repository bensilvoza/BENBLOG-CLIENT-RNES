// libraries
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";

// contexts
import { NotificationContext } from "../contexts/shared/notificationContext";

// components
import Spacer from "../components/shared/spacer";
import Form from "../components/login/form";
import TopCenterNotification from "../components/shared/topCenterNotification";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

function Login() {
  const navigate = useNavigate();

  // contexts
  let { notificationMessage, notificationColor } =
    useContext(NotificationContext);

  function handleClickBackArrow() {
    return navigate("/");
  }

  return (
    <>
      {notificationMessage != undefined && (
        <TopCenterNotification
          message={notificationMessage}
          color={notificationColor}
        />
      )}

      <Grid overrides={gridJustifyContentCenter}>
        <Cell span={4}>
          <Spacer height="1rem" />
          <div
            style={{ fontSize: "1.5rem", cursor: "pointer", color: "gray" }}
            onClick={handleClickBackArrow}
          >
            <i className="bi bi-arrow-left"></i>
          </div>
          <Spacer height="4rem" />
          <h1 style={{ fontWeight: "900" }}>Log in</h1>
          <Spacer height="1rem" />
          <Form />
        </Cell>
      </Grid>
    </>
  );
}

export default Login;
