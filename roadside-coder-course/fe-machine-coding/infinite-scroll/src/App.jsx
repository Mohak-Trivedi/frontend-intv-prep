/*
Implement Infinite Scrolling in ReactJS.

Requirements:
  - Implement infinite scrolling for fetching more products when the user reaches the bottom of the page.
  https://dummyjson.com/docs/products
  - Ensure that loading indicators are displayed appropriately while fetching data.
  - Implement optimizations to prevent excessive API requests during scrolling.
*/

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 500 > document.documentElement.offsetHeight) {
      // console.log("api call");
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${page*10}`);
      const data = await res.json();
      setProducts(data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const { products: allProducts } = products;

  return (
    <div>
      <h1>Infinite Scrolling</h1>
      {allProducts?.length > 0 && (
        <div className='products'>
          {allProducts?.map((prod) => {
            return (
              <div className='products__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App
