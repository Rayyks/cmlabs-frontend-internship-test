$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("mealId");

  if (mealId) {
    fetchMealDetails(mealId);
  } else {
    console.error("No meal ID provided in the URL.");
  }

  // Animasi untuk body saat halaman dimuat
  gsap.from("body", { opacity: 0, duration: 0.5 });
});

async function fetchMealDetails(mealId) {
  $("#loader").removeClass("hidden");
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];

      // Mengisi data makanan
      document.getElementById("mealName").innerText = meal.strMeal;
      document.getElementById("mealImage").src = meal.strMealThumb;
      document.getElementById("mealInstructions").innerText =
        meal.strInstructions;

      const recipesList = document.getElementById("mealRecipes");
      recipesList.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          const listItem = document.createElement("li");
          listItem.innerText = `${measure} ${ingredient}`.trim();
          recipesList.appendChild(listItem);
        }
      }

      // Memasang video jika ada
      const videoUrl = meal.strYoutube;
      if (videoUrl) {
        const videoId = videoUrl.split("v=")[1].split("&")[0];
        document.getElementById(
          "videoEmbed"
        ).src = `https://www.youtube.com/embed/${videoId}`;
      }

      animateMealDetails();
    } else {
      console.error("Meal not found.");
    }
  } catch (error) {
    console.error("Error fetching meal details:", error);
  } finally {
    $("#loader").addClass("hidden");
  }
}

function animateMealDetails() {
  gsap.from("#mealName", {
    opacity: 0,
    y: -50,
    duration: 0.5,
    ease: "power2.out",
  });
  gsap.from("#mealImage", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: "back.out(1.7)",
    delay: 0.2,
  });
  gsap.from("#mealInstructions", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.4,
  });
  gsap.from("#mealRecipes li", {
    opacity: 0,
    y: 10,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.6,
  });
  gsap.from("#videoEmbed", {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    ease: "back.out(1.7)",
    delay: 0.8,
  });
}
