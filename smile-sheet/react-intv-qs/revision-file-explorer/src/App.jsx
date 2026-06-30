import { useState } from "react";
import "./App.css";
import { explorerData } from "./data/folderData.js";
import Folder from "./components/Folder.jsx";
import useTraverseTree from "./hooks/use-traverse-tree.js";

export default function App() {
  const [explorer, setExplorer] = useState(explorerData);
  const { insertNode } = useTraverseTree();

  function handleInsertNode(folderId, itemName, isFolder) {
    const updatedTree = insertNode(explorer, folderId, itemName, isFolder);
    setExplorer(updatedTree);
  }

  return (
    <div className="app">
      <Folder explorer={explorer} handleInsertNode={handleInsertNode} />
    </div>
  );
}
