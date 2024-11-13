"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now().toString(),
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
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-xl font-semibold text-gray-800 mb-2">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter item name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
          />
        </div>

        {/* Quantity Field */}
        <div>
          <label htmlFor="quantity" className="block text-xl font-semibold text-gray-800 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-4 mt-1">
            <button
              type="button"
              onClick={decrement}
              disabled={count === 1}
              className={`bg-orange-500 text-white text-lg w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                count === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
              } transition duration-200`}
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="1"
              max="20"
              required
              className="w-16 text-center p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            />
            <button
              type="button"
              onClick={increment}
              disabled={count === 20}
              className={`bg-orange-500 text-white text-lg w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                count === 20 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
              } transition duration-200`}
            >
              +
            </button>
          </div>
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-xl font-semibold text-gray-800 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
