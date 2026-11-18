function showToast(message) {
    let toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}
// Smooth Scrolling for Book Buttons

document.querySelectorAll('a[href="#booking"]').forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const bookingSection = document.querySelector("#booking");

        if (bookingSection) {

            bookingSection.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Redirecting to Ticket Booking!");

        }

    });

});
//  Live Booking Summary

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

function updateSummary() {
    const match = matchSelect.options[matchSelect.selectedIndex].text;
    const stand = standSelect.options[standSelect.selectedIndex].text;
    const quantity = Number(quantityInput.value) || 0;

    const selectedOption = standSelect.options[standSelect.selectedIndex];
    const price = Number(selectedOption.dataset.price) || 0;

    const total = price * quantity;

    document.getElementById("summaryMatch").textContent = match;
    document.getElementById("summaryStand").textContent = stand;
    document.getElementById("summaryPrice").textContent = price;
    document.getElementById("summaryQuantity").textContent = quantity;
    document.getElementById("totalAmount").textContent = total;

    showToast("Booking Summary Updated!");
}

// Add event listeners only when booking form exists
if (matchSelect && standSelect && quantityInput) {
    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("input", updateSummary);
}

// Prevent page refresh on form submission
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        showToast("Booking submitted successfully!");
    });
}
// Team Filter

const teamFilter = document.getElementById("team-filter");

if (teamFilter) {

    teamFilter.addEventListener("change", function () {

        const selectedTeam = teamFilter.value;

        const matchCards = document.querySelectorAll(".match-card");

        matchCards.forEach(function (card) {

            const teams = card.dataset.teams;

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

        showToast("Match Filter Updated!");

    });

}
// Grid and List View Toggle

const matchContainer = document.querySelector(".match-container");
const gridButton = document.getElementById("gridView");
const listButton = document.getElementById("listView");

if (matchContainer && gridButton && listButton) {

    matchContainer.classList.add("grid-view");

    gridButton.addEventListener("click", function () {
        matchContainer.classList.remove("list-view");
        matchContainer.classList.add("grid-view");

        showToast("Grid View Enabled!");
    });

    listButton.addEventListener("click", function () {
        matchContainer.classList.remove("grid-view");
        matchContainer.classList.add("list-view");

        showToast("List View Enabled!");
    });
}
//  Hamburger Menu

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        showToast("Navigation Menu Toggled!");

    });

}