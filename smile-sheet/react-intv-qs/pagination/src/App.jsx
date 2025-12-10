import { useEffect, useState } from 'react';
import './App.css';
import { PAGE_SIZE } from './constants';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';


function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  async function fetchData() {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const json = await data.json();
      setProducts(json.products);
    } catch (err) {
      console.error(err);
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function goToPrevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  function goToNextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  return !products.length ? (<h1>No Products Found</h1>) : (
    <div className='app'>
      <h1>Pagination</h1>

      <div className='products-container'>
        {products.slice(start, end).map((product) => {
          return (
            <ProductCard key={product.id} image={product.thumbnail} title={product.title} />
          );
        })}
      </div>

      <Pagination
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        noOfPages={noOfPages}
      />
    </div>
  )
}

export default App
