import { useState } from "react";

export default function Folder({ explorer, handleInsertNode }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function onAddItem(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  }

  function handleAddItem(e, isFolder) {
    e.stopPropagation();

    setExpanded(true);

    setShowInput({ visible: true, isFolder });
  }

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpanded(!expanded)}>
          <span>
            {expanded ? "📂" : "📁"} {explorer.name}
          </span>

          <div className="buttons-container">
            <button onClick={(e) => handleAddItem(e, true)}>Folder +</button>
            <button onClick={(e) => handleAddItem(e, false)}>File +</button>
          </div>
        </div>

        {expanded && (
          <div className="nested">
            {showInput.visible && (
              <div>
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  type="text"
                  autoFocus
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onKeyDown={(e) => onAddItem(e)}
                />
              </div>
            )}

            {explorer.items.map((item) => (
              <Folder
                key={item.id}
                explorer={item}
                handleInsertNode={handleInsertNode}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="file">
        <span>📄 {explorer.name}</span>
      </div>
    );
  }
}
