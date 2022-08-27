import { useContext } from "react";

// libraries
import { Grid, Cell } from "baseui/layout-grid";

// contexts
import { NotificationContext } from "../contexts/shared/notificationContext";

// components
import Spacer from "../components/shared/spacer";
import Form from "../components/register/form";
import TopCenterNotification from "../components/shared/topCenterNotification";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

function Register() {
  // contexts
  let { notificationMessage, notificationColor } =
    useContext(NotificationContext);
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
          <Spacer height="4rem" />
          <h1 style={{ fontWeight: "900" }}>Register</h1>
          <Spacer height="1rem" />
          <Form />
        </Cell>
      </Grid>
    </>
  );
}

export default Register;
