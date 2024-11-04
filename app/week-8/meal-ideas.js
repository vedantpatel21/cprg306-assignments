"use client";

import { useEffect, useState } from "react";

// Function to fetch meal ideas based on the ingredient
async function fetchMealIdeas(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching meal ideas:", error);
        return [];
    }
}

// MealIdeas component definition
export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);

    // Function to load meal ideas
    const loadMealIdeas = async () => {
        const fetchedMeals = await fetchMealIdeas(ingredient);
        setMeals(fetchedMeals);
    };

    // useEffect to load meal ideas when the ingredient prop changes
    useEffect(() => {
        if (ingredient) {
            loadMealIdeas();
        }
    }, [ingredient]);

    // Render the component
    return (
        <div>
            <h2>Meal Ideas for {ingredient}</h2>
            {meals.length > 0 ? (
                <ul>
                    {meals.map((meal) => (
                        <li key={meal.idMeal}>
                            <p>{meal.strMeal}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No meal ideas available for {ingredient}.</p>
            )}
        </div>
    );
}
