export default function useTraverseTree() {
  function insertNode(tree, folderId, itemName, isFolder) {
    if (tree.isFolder && tree.id === folderId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });

      return tree;
    }

    let updatedNodes = [];
    updatedNodes = tree.items.map((item) =>
      insertNode(item, folderId, itemName, isFolder),
    );
    return { ...tree, items: updatedNodes };
  }

  return { insertNode };
}
