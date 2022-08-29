// libraries
import { useEffect, useContext } from "react";
import axios from "axios";
import { Grid, Cell } from "baseui/layout-grid";

// contexts
import { NotificationContext } from "../contexts/shared/notificationContext";
import { PostsContext } from "../contexts/shared/postsContext";

// components
import Spacer from "../components/shared/spacer";
import Posts from "../components/home/posts";
import CreateAndLogoutButton from "../components/home/createAndLogoutButton";
import TopCenterNotification from "../components/shared/topCenterNotification";

// utils
import gridJustifyContentCenter from "../utils/shared/gridJustifyContentCenter";

function Home() {
  // contexts
  let { notificationMessage, notificationColor } =
    useContext(NotificationContext);

  let { postsData, handlePostsData } = useContext(PostsContext);

  useEffect(function () {
    async function getPosts() {
      if (postsData == undefined) {
        // communicate to BENBLOG-SERVER-RNES
        let response = await axios.get("http://localhost:5000/");

        if (response["data"]["message"] == "OK") {
          let posts = response["data"]["result"];

          // update posts context
          handlePostsData(posts);
        }
      }
    }
    getPosts();

    return;
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
          <h1 style={{ fontWeight: "900" }}>Benblog</h1>
          <Spacer height="1rem" />
          <CreateAndLogoutButton />

          <Spacer height="1.5rem" />
          <Posts />
        </Cell>
      </Grid>
    </>
  );
}

export default Home;
