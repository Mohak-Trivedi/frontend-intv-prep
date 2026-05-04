import { useState } from "react";

export default function Folder({ handleInsertNode, explorer }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function handleNewItem(e, isFolder) {
    e.stopPropagation();

    setExpanded(true);

    setShowInput({ visible: true, isFolder });
  }

  function onAddItem(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpanded(!expanded)}>
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewItem(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewItem(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expanded ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => onAddItem(e)}
              />
            </div>
          )}

          {explorer.items.map((item) => (
            <Folder
              key={item.id}
              handleInsertNode={handleInsertNode}
              explorer={item}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}
