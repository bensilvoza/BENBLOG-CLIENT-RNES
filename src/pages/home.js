// libraries
import { Grid, Cell } from "baseui/layout-grid";

// components
import Spacer from "../components/shared/spacer";
import Posts from "../components/home/posts";
import CreateAndLogoutButton from "../components/home/createAndLogoutButton";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

function Home() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Cell span={6}>
        <Spacer height="4rem" />
        <h1 style={{ fontWeight: "900" }}>Benblog</h1>
        <Spacer height="1rem" />
        <CreateAndLogoutButton />

        <Spacer height="1.5rem" />
        <Posts />
      </Cell>
    </Grid>
  );
}

export default Home;
