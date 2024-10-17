$(document).ready(function () {
  $("#loader").removeClass("hidden");
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    method: "GET",
    success: function (response) {
      $("#loader").addClass("hidden");
      let categories = response.categories;
      categories.forEach((category, index) => {
        $("#categoryList").append(`
            <div class="relative overflow-hidden rounded-lg cursor-pointer group" onclick="goToCategoryDetail('${category.strCategory}')">
              <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <h2 class="text-white text-xl font-semibold group-hover:opacity-0">${category.strCategory}</h2>
              </div>
            </div>
          `);

        gsap.from(`#categoryList > div:last-child`, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    },
    error: function () {
      alert("Error fetching categories");
    },
  });
});

function goToCategoryDetail(category) {
  gsap.to("body", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      window.location.href = `category-detail.html?category=${category}`;
    },
  });
}
