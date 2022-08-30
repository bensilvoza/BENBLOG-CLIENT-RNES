// libraries
import { useState, useContext } from "react";
import { Input } from "baseui/input";

// contexts
import { UserContext } from "../../../contexts/shared/userContext";

// components
import Spacer from "../../shared/spacer";
import WidthSapcer from "../../shared/widthSpacer";

// utils
import uid from "../../../utils/shared/uid";

function CommentSection(props) {
  // contexts
  let { userData } = useContext(UserContext);

  let [tree, setTree] = useState([]);
  // decoded tree or flattened tree
  // we will only rendering nodes from decodedTree
  // decodedTree will lool like these --> [{}, {}, {}, {}]
  let [decodedTree, setDecodedTree] = useState([]);
  let [rootComment, setRootComment] = useState("");
  let childComment;

  function handleClickReplyButton(id) {
    // if there's another comment box,
    // remove first on the decodedTree because
    // comment box will show one at a time
    let decodedTreeCopy = [...decodedTree];
    for (let i = 0; i < decodedTreeCopy.length; i++) {
      if (decodedTreeCopy[i]["value"] == "commentBox") {
        // At position i, remove node
        decodedTreeCopy.splice(i, 1);
        break;
      }
    }

    let node = { value: "commentBox" };

    // traverse decodedTree to get indentCount of parent node
    for (let i = 0; i < decodedTreeCopy.length; i++) {
      if (decodedTreeCopy[i]["id"] == id) {
        node["indentCount"] = decodedTreeCopy[i]["indentCount"] + 1;
        node["author"] = decodedTreeCopy[i]["author"];

        // At position i+1, add node
        decodedTreeCopy.splice(i + 1, 0, node);

        // update decodedTree
        setDecodedTree(decodedTreeCopy);
        break;
      }
    }
  }

  function handleSubmitChildForm(e) {
    e.preventDefault();

    let node = {
      id: uid(),
      author: userData["name"],
      indentCount: undefined,
      reactionCount: 0,
      body: childComment,
      children: [],
    };

    // traverse decodedTree to know the parent id
    // and also get the indentCount
    let parentId;
    for (let i = 0; i < decodedTree.length; i++) {
      if (decodedTree[i]["value"] == "commentBox") {
        parentId = decodedTree[i - 1]["id"];
        node["indentCount"] = decodedTree[i - 1]["indentCount"] + 1;

        // add the node to their parent
        let treeCopy = [...tree];
        for (let i = 0; i < treeCopy.length; i++) {
          if ((treeCopy[i]["id"] = parentId)) {
            treeCopy[i]["children"].push(node);
            break;
          }
        }

        break;
      }
    }

    console.log("...");

    return;

    // decode tree or traverse tree
    // DFS

    // [{children:[{}]}, {}, {}]

    let decodedTreeCopy = [];
    function dfs(tree, index) {
      let node = tree[index];

      // delete children for decodedTree remain flat
      delete node["children"];

      decodedTreeCopy.push(node);

      tree = tree[index]["children"];

      dfs(tree, index);
    }
    // call
    // dfs(tree, 0);
  }

  // root comment form
  function handleSubmitForm(e) {
    e.preventDefault();

    let decodedTreeCopy = [...decodedTree];

    let node = {
      id: uid(),
      author: userData["name"],
      indentCount: 0,
      reactionCount: 0,
      body: rootComment,
    };
    decodedTreeCopy.push(node);

    // create a copy and save to tree
    let nodeCopy = node;
    nodeCopy["children"] = [];
    let treeCopy = [...tree];
    treeCopy.push(node);
    setTree(treeCopy);

    // update decodedTree
    setDecodedTree(decodedTreeCopy);
    // reset state
    setRootComment("");
  }

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <Input
          overrides={{
            Input: {
              style: {
                backgroundColor: "white",
              },
            },
          }}
          value={rootComment}
          onChange={(e) => setRootComment(e.target.value)}
          placeholder="Write a comment..."
        />
      </form>

      <Spacer height="1rem" />

      {decodedTree.map((node) => (
        <div
          style={{ paddingLeft: `${node["indentCount"]}rem` }}
          key={node["id"] != undefined ? node["id"] : uid()}
        >
          {node["id"] != undefined ? (
            <div>
              <div
                style={{
                  padding: ".4rem",
                  backgroundColor: "#00000012",
                  borderRadius: ".5rem",
                }}
              >
                <p style={{ margin: "0", fontWeight: "900" }}>
                  {node["author"]}
                </p>
                <p style={{ margin: "0" }}>{node["body"]}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ margin: "0" }}>Like</p>
                <WidthSapcer width="1rem" />
                <p
                  style={{ margin: "0", cursor: "pointer" }}
                  onClick={function () {
                    handleClickReplyButton(node["id"]);
                  }}
                >
                  Reply
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitChildForm}>
              <Input
                onChange={(e) => (childComment = e.target.value)}
                placeholder={"Reply to " + node["author"] + "..."}
              />
            </form>
          )}
        </div>
      ))}
    </>
  );
}

export default CommentSection;
