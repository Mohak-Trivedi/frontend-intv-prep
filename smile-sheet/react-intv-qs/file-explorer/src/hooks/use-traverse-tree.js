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

    let latestNode = [];
    latestNode = tree.items.map((obj) =>
      insertNode(obj, folderId, itemName, isFolder),
    );
    return { ...tree, items: latestNode };
  }

  return { insertNode };
}
