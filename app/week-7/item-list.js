'use client';

import { useState } from 'react';
import Item from './item';

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState('name');

  const groupItemsByCategory = () => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const sortedItems = sortBy === 'group'
    ? groupItemsByCategory()
    : [...items].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
          return a.category.localeCompare(b.category);
        }
        return 0;
      });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Sorting Buttons */}
      <div className="mb-6 flex space-x-4 justify-center">
        <button
          className={`px-4 py-2 rounded-lg text-white shadow-md transition duration-300 ${
            sortBy === 'name' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'
          }`}
          onClick={() => setSortBy('name')}
        >
          Sort by Name
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white shadow-md transition duration-300 ${
            sortBy === 'category' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'
          }`}
          onClick={() => setSortBy('category')}
        >
          Sort by Category
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white shadow-md transition duration-300 ${
            sortBy === 'group' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'
          }`}
          onClick={() => setSortBy('group')}
        >
          Group by Category
        </button>
      </div>

      {/* Render Items */}
      {sortBy === 'group' ? (
        <div className="space-y-6">
          {Object.entries(sortedItems).map(([category, categoryItems]) => (
            <div key={category} className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold capitalize text-gray-700 mb-3 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <ul className="list-none space-y-2">
                {categoryItems.sort((a, b) => a.name.localeCompare(b.name)).map(item => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="list-none space-y-4">
          {sortedItems.map(item => (
            <li key={item.id} className="p-4 bg-white rounded-lg shadow-lg">
              <Item
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
