"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); 

  
  const fetchMealIdeas = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
      return [];
    }
  };

  
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals) {
        const meal = data.meals[0];
        
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`.trim());
          }
        }
        setSelectedMeal({ ...meal, ingredients });
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setSelectedMeal(null);
    }
  };

  
  useEffect(() => {
    if (ingredient) {
      setSelectedMeal(null); 
      const loadMealIdeas = async () => {
        const mealData = await fetchMealIdeas(ingredient);
        setMeals(mealData);
      };
      loadMealIdeas();
    }
  }, [ingredient]); 

  
  return (
    <div className="p-4 bg-white rounded-md shadow-md w-full">
      <h2 className="text-xl font-bold mb-2">Meal Ideas for: {ingredient}</h2>
      {meals.length > 0 ? (
        <ul className="space-y-4">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => fetchMealDetails(meal.idMeal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-20 h-20 rounded-md" />
              <span className="font-medium">{meal.strMeal}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No meal ideas found for this ingredient.</p>
      )}

      {/* Display selected meal ingredients if available */}
      {selectedMeal && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold mb-2">{selectedMeal.strMeal}</h3>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="w-full mb-4 rounded-md" />
          <p><strong>Ingredients:</strong></p>
          <ul className="list-disc ml-6">
            {selectedMeal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
