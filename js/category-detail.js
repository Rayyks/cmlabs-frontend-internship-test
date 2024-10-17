$(document).ready(function () {
  $("#loader").removeClass("hidden");
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  $("#categoryName").text(category);
  $("#mealName").text(category.toUpperCase() + " MEAL");

  $.ajax({
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    method: "GET",
    success: function (response) {
      $("#loader").addClass("hidden");
      let meals = response.meals;
      meals.forEach((meal, index) => {
        $("#mealList").append(`
          <div class="relative overflow-hidden rounded-lg cursor-pointer group" onclick="goToMealDetail('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110">
            <h2 class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold">${meal.strMeal}</h2>
          </div>
        `);

        gsap.from(`#mealList > div:last-child`, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    },
    error: function () {
      alert("Error fetching meals");
    },
  });
});

function goToMealDetail(mealId) {
  gsap.to("body", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      window.location.href = `meal-detail.html?mealId=${mealId}`;
    },
  });
}
