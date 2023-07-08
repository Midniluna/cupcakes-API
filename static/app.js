const BASE_URL = "http://localhost:5000/api";

// Used as a visual representation of cupcake data
function generateCupcakeHTML(cupcake) {
	return `
      <div data-cupcake-id=${cupcake.id} class="cupcake-wrapper">
        <li>
          ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          <button class="delete-button btn btn-danger btn-sm">X</button>
        </li>
        <a href="cupcakes/${cupcake.id}"><img class="Cupcake-img"
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
// update: I got it working :) I know you don't need a comment for this + I could have just deleted the last comment but I felt very accomplished and felt the need to share
$("#update-cupcake-form").on("submit", async function (evt) {
	evt.preventDefault();

	let flavor = "";
	let rating = "";
	let image = "";

	if ($("#flavor").val() != "") {
		flavor = $("#flavor").val().toLowerCase();
	}
	if ($("#rating").val() != "") {
		rating = $("#rating").val();
	}
	if ($("#image").val() != "") {
		image = $("#image").val();
	}

	let size = $("#size").val();

	// I FIXED IT. THANK THE LORD
	let $cupcake = $(".Cupcake-img").closest("div");
	let cupcakeId = $cupcake.attr("data-cupcake-id");

	await axios.patch(`${BASE_URL}/cupcakes/${cupcakeId}`, {
		flavor,
		rating,
		size,
		image,
	});

	window.location.reload();
});

// Delete a cupcake
$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest("div");
	let cupcakeId = $cupcake.attr("data-cupcake-id");
	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

// Delete cupcake from single cupcake info tab and redirect to homepage
$(".delete-button").on("click", async function (evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest("div");
	let cupcakeId = $cupcake.attr("data-cupcake-id");
	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	window.location.replace("http://localhost:5000/");
});

showAllCupcakes();
