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
// Live Booking Summary

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

// Update Booking Summary Function

function updateSummary() {

    const match = matchSelect.value;

    const stand = standSelect.value;

    const quantity = Number(quantityInput.value);

    const selectedOption =
        standSelect.options[standSelect.selectedIndex];

    const price = Number(selectedOption.dataset.price) || 0;

    const total = price * quantity;

    document.getElementById("summaryMatch").textContent =
        match || "Not selected";

    document.getElementById("summaryStand").textContent =
        stand || "Not selected";

    document.getElementById("summaryPrice").textContent =
        price;

    document.getElementById("summaryQuantity").textContent =
        quantity;

    document.getElementById("totalAmount").textContent =
        total;

    showToast("Booking Summary Updated!");
}

// Change Event Listeners

matchSelect.addEventListener("change", updateSummary);

standSelect.addEventListener("change", updateSummary);

quantityInput.addEventListener("change", updateSummary);
// Prevent page error on form submission
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        showToast("Booking submitted successfully!");
    });
}