const BASE_URL = "http://localhost:5000/api";

// Used as a visual representation of cupcake data
function generateCupcakeHTML(cupcake) {
	return `
      <div data-cupcake-id=${cupcake.id} class="cupcake-wrapper">
        <li>
          ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          <button class="delete-button btn btn-danger btn-sm">X</button>
        </li>
        <a href="#"><img class="Cupcake-img"
              src="${cupcake.image}"
              alt="(no image provided)"></a>
      </div>
    `;
	// <a href="cupcakes/${cupcake.id}">
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

	let flavor = $("#flavor").val().toLowerCase();
	let size = $("#size").val();
	let rating = $("#rating").val();
	let image = $("#image").val();

	const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		rating,
		size,
		image,
	});
	newCupcake = generateCupcakeHTML(newCupcakeResponse.data.cupcake);
	$("#cupcakes-list").append(newCupcake);
	$("#new-cupcake-form").trigger("reset");
});

// Edit a single cupcake
// ---------- I got frustrated anbd gave up for now :sob emoji: --------------
// $("#update-cupcake-form").on("submit", async function (evt) {
// 	evt.preventDefault();

// 	let flavor;
// 	let rating;
// 	let image;

// 	if ($("#flavor").val() != "") {
// 		flavor = $("#flavor").val().toLowerCase();
// 	}
// 	if ($("#rating").val() != "") {
// 		rating = $("#rating").val();
// 	}
// 	if ($("#image").val() != "") {
// 		image = $("#image").val();
// 	}

// 	let size = $("#size").val();

// 	await axios.patch(`${BASE_URL}/cupcakes`, {
// 		flavor,
// 		rating,
// 		size,
// 		image,
// 	});

// 	window.location.reload();
// });

// Delete a cupcake
$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest("div");
	let cupcakeId = $cupcake.attr("data-cupcake-id");
	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

showAllCupcakes();
