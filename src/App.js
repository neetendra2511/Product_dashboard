import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import FilterSort from './components/FilterSort';
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...updatedProduct, id } : product
    );
    setProducts(updatedProducts);
    const updatedCategories = [...new Set(updatedProducts.map(product => product.category))];
    setCategories(updatedCategories);

    setCurrentProduct(null);
  };

  const deleteProduct = (id) => {
    const productToDelete = products.find(product => product.id === id);
    if (!productToDelete) return;

    setProducts(products.filter(product => product.id !== id));

    const updatedCategories = products
      .filter(product => product.id !== id)
      .map(product => product.category)
      .filter((category, index, self) => self.indexOf(category) === index);

    setCategories(updatedCategories);
  };

  const filteredProducts = products.filter(product =>
    filter ? product.category === filter : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'price') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div>
      <h1>Product Management</h1>
      <AddProduct onAdd={addProduct} />
      {currentProduct && <EditProduct product={currentProduct} onUpdate={updateProduct} />}
      <FilterSort
        categories={categories}
        onFilter={setFilter}
        onSort={setSort}
      />
      <ProductList
        products={sortedProducts}
        onEdit={(id) => setCurrentProduct(products.find(product => product.id === id))}
        onDelete={deleteProduct}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
