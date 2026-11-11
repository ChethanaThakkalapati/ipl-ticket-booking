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