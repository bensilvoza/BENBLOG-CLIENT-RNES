// libraries
import { useNavigate } from "react-router-dom";
import { Button, SIZE, KIND } from "baseui/button";

// components
import WidthSpacer from "../shared/widthSpacer";

function CreateAndLogoutButton() {
  const navigate = useNavigate();

  function handleNavigateCreatePage() {
    return navigate("/post/create");
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
          onClick={handleNavigateCreatePage}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default CreateAndLogoutButton;
