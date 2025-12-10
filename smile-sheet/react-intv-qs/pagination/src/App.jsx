import { useEffect, useState } from 'react'
import './App.css'

const PAGE_SIZE = 10;

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

      <div className='pagination-container'>
        <button className='page-number' disabled={currentPage===0} onClick={goToPrevPage}>⬅️</button>
        {[...Array(noOfPages).keys()].map((pageNumber) => (
          <button key={pageNumber} className={'page-number' + ((pageNumber===currentPage) ? ' active' : '')} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button className='page-number' disabled={currentPage===noOfPages-1} onClick={goToNextPage}>➡️</button>
      </div>
    </div>
  )
}

function ProductCard({ image, title }) {
  return (
    <div className='product-card'>
      <img src={image} alt={title} className='product-img' />
      <span>{title}</span>
    </div>
  );
}

export default App
