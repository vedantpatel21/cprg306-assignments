
"use client";

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas'; 
import itemsData from './items.json'; 

export default function Page() {

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');


  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };


  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(',')[0] 
      .replace(/([✀-➿]|[-]|�[�-�]|�[�-�]|[\u2011-\u26FF]|�[�-�])/g, '') 
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Shopping List
      </h1>
      <div className="flex space-x-8">
        <div className="flex-1">
         
          <NewItem onAddItem={handleAddItem} />

       
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
   
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}