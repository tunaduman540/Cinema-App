const email = document.getElementById("email");
const middle1 = document.getElementById("middle1");
const seatContainer = document.getElementById("seatContainer");
const age = document.getElementById("age");
const priceBox = document.getElementById("price-box");
const selectedSeatsList = document.getElementById("selected-seats-list");
const totalPriceElement = document.getElementById("total-price");
const confirmButton = document.getElementById("confirm-button");

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    middle1.innerHTML = "";
    if (email.value == "admin@admin.com") {
        const h1 = document.createElement("h1");
        const h1Text = document.createTextNode("Admin Interface");
        h1.appendChild(h1Text);
        middle1.appendChild(h1);

        const form = document.createElement("form");

        const rowInput = document.createElement("input");
        rowInput.setAttribute("placeholder", "Enter row number");
        form.appendChild(rowInput);

        const columnInput = document.createElement("input");
        columnInput.setAttribute("placeholder", "Enter column number");
        form.appendChild(columnInput);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const rowNumber = parseInt(rowInput.value);
            const columnNumber = parseInt(columnInput.value);

            seatContainer.innerHTML = "";

            for (let i = 1; i <= rowNumber; i++) {
                const row = document.createElement("div");
                row.className = "row d-flex gap-2 mb-2";

                for (let j = 1; j <= columnNumber; j++) {
                    const seat = document.createElement("div");
                    seat.className = "seat";
                    seat.textContent = String.fromCharCode(64 + i) + j;

                    seat.addEventListener("click", () => {
                        if (seat.classList.contains("selected-seat")) {
                            seat.classList.remove("selected-seat");
                        } else {
                            seat.classList.add("selected-seat");
                        }
                        updateSelectedSeats();
                    });

                    seat.addEventListener("mouseover", () => {
                        priceBox.style.display = "block";
                        const rect = seat.getBoundingClientRect();
                        priceBox.style.top = `${rect.top + window.scrollY}px`;
                        priceBox.style.left = `${rect.left + window.scrollX}px`;
                        displayPrice();
                    });

                    seat.addEventListener("mouseout", () => {
                        priceBox.style.display = "none";
                    });

                    row.appendChild(seat);
                }
                seatContainer.appendChild(row);
            }
        });
        middle1.appendChild(form);

        const button = document.createElement("button");
        button.setAttribute("type", "submit");
        const buttonText = document.createTextNode("Submit");
        button.appendChild(buttonText);
        form.appendChild(button);
        displayPrice();

    } else {
        const h1 = document.createElement("h1");
        const h1Text = document.createTextNode("User Interface");
        h1.appendChild(h1Text);
        middle1.appendChild(h1);
        displayPrice();
    }
});

function getSelectedSeats() {
    const selectedSeats = document.querySelectorAll(".selected-seat");
    return Array.from(selectedSeats).map(seat => seat.textContent);
}

function updateTotalPrice(seatCount) {
    const pricePerSeat = getPrice();
    const totalPrice = seatCount * pricePerSeat;
    totalPriceElement.textContent = "Total Price: " + totalPrice + "$";
}

function updateSelectedSeats() {
    const selectedSeats = getSelectedSeats();
    selectedSeatsList.innerHTML = '';
    selectedSeats.forEach(seat => {
        const li = document.createElement("li");
        li.textContent = seat;
        li.className = "list-group-item";
        selectedSeatsList.appendChild(li);
    });
    updateTotalPrice(selectedSeats.length);
    confirmButton.style.display = selectedSeats.length > 0 ? "block" : "none";
}

function getPrice() {
    let price = 0;
    if (age.value >= 0 && age.value < 18) {
        price = 10;
    } else if (age.value >= 18 && age.value < 26) {
        price = 15;
    } else if (age.value >= 26 && age.value <= 65) {
        price = 25;
    } else if (age.value > 65) {
        price = 10;
    }
    return price;
}

function displayPrice() {
    const price = getPrice();
    priceBox.textContent = price + "$";
}

confirmButton.addEventListener("click", () => {
    const selectedSeats = getSelectedSeats();
    const totalPrice = totalPriceElement.textContent.split(": ")[1];
    alert(`Dear Admin Manager \nSelected Seats: ${selectedSeats.join(", ")}\nTotal Amount: ${totalPrice}\n Would you like to cmplete your purchase`);
});
