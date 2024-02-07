import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data = await res.json();
    if (data && data.products) {
      setProduct(data.products);
      setTotalPages(data.total/10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
