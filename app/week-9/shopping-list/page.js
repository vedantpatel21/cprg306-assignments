"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

const ShoppingListPage = () => {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/week-9"); 
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push("/week-9"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .split(" ")[0];

    setSelectedItemName(cleanedName);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">Shopping List</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
        <div className="flex space-x-8">
          <div className="w-1/2">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow-inner">
            {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingListPage;
