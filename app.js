(async function () {
    const response = await fetch('./recipes.json');
    const recipes = await response.json();

    const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipes-list");
    const detailsElem = document.getElementById("recipeDetailsContainer");

    function loadRecipeDetails(recipe) {
        console.log(recipe);
        detailsElem.innerHTML = `
            <h2 class="title">${recipe.Name}</h2>
            <h3>Ingredients</h3>
            <ul class="section2ul">${recipe.Ingredients.map(function (Ingredients) {
            return "<li>" + Ingredients + "</li>"
        }).join("")}</ul>
        <h3>Instructions</h3>
        <div>${recipe.Description}</div>
        <h3>Method</h3>
        <div>${recipe.Method}</div>
        <h3>Author</h3>
        <div>${recipe.Author}</div>
        `;
    }

    function displaySearchResults(results) {
        listElem.innerHTML = "";
        results.forEach(function (recipe) {
            const li = document.createElement("li");
            const listItem = `
                <div class="title2">${recipe.Name}</div>
               
            `;
            li.innerHTML = listItem;
            li.addEventListener("click", function () {
                loadRecipeDetails(recipe);
            });
            listElem.appendChild(li);
        })
    }

    function search() {
        const query = inputElem.value;
        const results = recipes.filter(function (recipe) {
            return (recipe.Name.toLowerCase().includes(query)
                || recipe.Ingredients.join(" ").toLowerCase().includes(query))
        });

        displaySearchResults(results);
    }

    btnElem.addEventListener("click", search);

})();
