"use client";

import { useState } from 'react';

const NewItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => (prevQuantity < 20 ? prevQuantity + 1 : prevQuantity));
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-md">
      <div className="text-lg font-medium">Quantity: {quantity}</div>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default NewItem;
