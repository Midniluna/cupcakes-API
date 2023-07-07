const BASE_URL = "http://localhost:5000/api";

// Show slider value
$(document).on("input change", "#form-rating", function () {
	$("#slider-value").html($(this).val());
});

// Used as a visual representation of cupcake data
function generateCupcakeHTML(cupcake) {
	return `
      <div data-cupcake-id=${cupcake.id} class="cupcake-wrapper">
        <li>
          ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          <button class="delete-button btn btn-danger btn-sm">X</button>
        </li>
        <a href="${BASE_URL}/cupcakes/${cupcake.id}"><img class="Cupcake-img"
              src="${cupcake.image}"
              alt="(no image provided)"></a>
      </div>
    `;
}

// Show initial cupcakes
async function showAllCupcakes() {
	let response = await axios.get(`${BASE_URL}/cupcakes`);
	for (let cupcakes of response.data.cupcakes) {
		let newCupcake = generateCupcakeHTML(cupcakes);
		$("#cupcakes-list").append(newCupcake);
	}
}

// Make a new cupcake
$("#new-cupcake-form").on("submit", async function (evt) {
	evt.preventDefault();
	let flavor = $("#form-flavor").val().toLowerCase();
	let size = $("#form-size").val().toLowerCase();
	let rating = $("#form-rating").val();
	let image = $("#form-image").val();
	const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		rating,
		size,
		image,
	});
	newCupcake = generateCupcakeHTML(newCupcakeResponse.data.cupcake);
	$("#cupcakes-list").append(newCupcake);
	$("#new-cupcake-form").trigger("reset");
	$("#slider-value").val() = 5;
});

// Potential investment: Add a way to view and edit a single cupcake

// Delete a cupcake
$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest("div");
	let cupcakeId = $cupcake.attr("data-cupcake-id");
	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

showAllCupcakes();