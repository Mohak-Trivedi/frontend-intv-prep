document.addEventListener("DOMContentLoaded", function () {
  let products = [];
  let page = 1;

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();

      if (data && data.products) {
        products = data.products;
        console.log(products);
        render();
      }
    } catch (err) {
      console.error("Error fetching products: ", err);
    }
  };

  const render = () => {};

  fetchProducts();
});
