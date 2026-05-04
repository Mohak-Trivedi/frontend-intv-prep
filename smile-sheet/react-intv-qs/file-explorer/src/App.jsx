import { useState } from "react";
import "./App.css";
import explorer from "./data/folderData.js";
import Folder from "./components/Folder.jsx";
import useTraverseTree from "./hooks/use-traverse-tree.js";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  function handleInsertNode(folderId, itemName, isFolder) {
    const updatedTree = insertNode(explorerData, folderId, itemName, isFolder);

    setExplorerData(updatedTree);
  }

  return (
    <>
      <div className="App">
        <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
      </div>
    </>
  );
}

export default App;
