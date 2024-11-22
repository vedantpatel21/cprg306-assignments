"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getItems, addItem } from "../_services/shopping-list-service";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

const ShoppingListPage = () => {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Fetch items from Firestore on component mount
  useEffect(() => {
    if (!user) {
      router.push("/week-10"); 
    } else {
      const loadItems = async () => {
        try {
          const fetchedItems = await getItems(user.uid); 
          setItems(fetchedItems);
        } catch (error) {
          console.error("Failed to load items:", error);
        }
      };
      loadItems();
    }
  }, [user, router]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push("/week-10"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Add new item to Firestore and update state
  const handleAddItem = async (newItem) => {
    try {
      const itemId = await addItem(user.uid, newItem); // Add item to Firestore
      setItems((prevItems) => [...prevItems, { id: itemId, ...newItem }]); // Update state
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // Handle item selection for meal ideas
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
    <main className="flex items-start justify-between min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
          Logout
        </button>
      </div>
      <div className="w-full max-w-lg ml-8">
        {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
      </div>
    </main>
  );
};

export default ShoppingListPage;
