import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => onEdit(product.id)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </li>
  );
};

export default ProductItem;
