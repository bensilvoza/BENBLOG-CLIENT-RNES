// libraries
import { Grid, Cell } from "baseui/layout-grid";

// components
import Spacer from "../../components/shared/spacer";
import Form from "../../components/post/editPost/form";

// utils
import gridJustifyContentCenter from "../../utils/shared/gridJustifyContentCenter";

function EditPost() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Cell span={6}>
        <Spacer height="4rem" />
        <h1 style={{ fontWeight: "900" }}>Edit Post</h1>
        <Spacer height="1rem" />
        <Form />
      </Cell>
    </Grid>
  );
}

export default EditPost;
