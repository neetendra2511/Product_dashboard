import React from 'react';

const FilterSort = ({ categories, onFilter, onSort }) => {
  return (
    <div>
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
};

export default FilterSort;
