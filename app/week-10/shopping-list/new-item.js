"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now().toString(), // Unique ID for each item
      name,
      quantity: count,
      category,
    };

    
    onAddItem(newItem);

    // Clear the form after submission
    setName("");
    setCount(1);
    setCategory("Produce");
  };

  const increment = () => setCount((prev) => Math.min(prev + 1, 20));
  const decrement = () => setCount((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Quantity Field */}
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="number"
              id="quantity"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="1"
              max="20"
              required
              className="p-2 border border-gray-300 rounded-md w-20"
            />
            <button type="button" onClick={increment} disabled={count === 20} className="bg-orange-500 text-white text-xl w-10 h-10 rounded-full">
              +
            </button>
            <button type="button" onClick={decrement} disabled={count === 1} className="bg-orange-500 text-white text-xl w-10 h-10 rounded-full">
              -
            </button>
          </div>
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Meat">Meat</option>
            <option value="Frozen Foods">Frozen Foods</option>
            <option value="Canned Goods">Canned Goods</option>
            <option value="Dry Goods">Dry Goods</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Household">Household</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Add Item
        </button>
      </form>
    </div>
  );
}
