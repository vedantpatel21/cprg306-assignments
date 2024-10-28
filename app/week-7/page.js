// Add the "use client" directive
"use client";

import { useState } from 'react';
import NewItem from './new-item'; // Adjust the path if necessary
import ItemList from './item-list';
import itemsData from './items.json'; // Adjust the path if necessary

export default function Page() {
  // Initialize state with data from items.json
  const [items, setItems] = useState(itemsData);

  // Event handler to add a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Shopping List
      </h1>
      {/* Render NewItem and pass handleAddItem as a prop */}
      <NewItem onAddItem={handleAddItem} />

      {/* Render ItemList and pass the items state as a prop */}
      <ItemList items={items} />
    </main>
  );
}
