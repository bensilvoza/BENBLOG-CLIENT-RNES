// libraries
import { Grid, Cell } from "baseui/layout-grid";

// components
import Spacer from "../components/shared/spacer";
import Form from "../components/register/form";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

function Register() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Cell span={4}>
        <Spacer height="4rem" />
        <h1 style={{ fontWeight: "900" }}>Register</h1>
        <Spacer height="1rem" />
        <Form />
      </Cell>
    </Grid>
  );
}

export default Register;
