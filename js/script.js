document.addEventListener("DOMContentLoaded", () => {
  const studentInfo = document.getElementById("studentInfo");
  studentInfo.textContent = "Created by Chainpreet Singh - ID: 200592535";

  const categoryDropdown = document.getElementById("categorySelector");
  const mealDetails = document.getElementById("mealDetails");

  // Fetch all categories
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(response => response.json())
      .then(data => {
          data.categories.forEach(category => {
              const option = document.createElement("option");
              option.value = category.strCategory;
              option.textContent = category.strCategory;
              categoryDropdown.appendChild(option);
          });
      });

  // When category is selected
  categoryDropdown.addEventListener("change", () => {
      const selected = categoryDropdown.value;
      if (!selected) return;

      // Get list of meals in category
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`)
          .then(response => response.json())
          .then(data => {
              const meal = data.meals[Math.floor(Math.random() * data.meals.length)];
              getMealDetails(meal.idMeal);
          });
  });

  // Get full details of meal
  function getMealDetails(mealID) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
          .then(response => response.json())
          .then(data => {
              const meal = data.meals[0];
              displayMeal(meal);
          });
  }

  // Display full meal info
  function displayMeal(meal) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
              ingredients.push(`${ingredient} - ${measure}`);
          }
      }

      mealDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img id="mealImage" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
      `;
  }
});
