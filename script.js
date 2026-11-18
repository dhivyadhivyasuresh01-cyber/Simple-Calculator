
const display = document.getElementById("display");

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", function(event) {

    if (event.target.tagName !== "BUTTON") {
        return;
    }

    let value = event.target.dataset.value;

    // Clear button
    if (value === "C") {
        display.value = "";
    }

    // Delete button
    else if (value === "⌫") {
        display.value = display.value.slice(0, -1);
    }

    // Equal button
    else if (value === "=") {
        try {
            if (display.value.trim() === "") return;

            if (!/^[0-9+\-*/.()\s]+$/.test(display.value)) {
                throw new Error("Invalid input");
            }

            let result = Function(
                '"use strict"; return (' + display.value + ')'
            )();

            if (!Number.isFinite(result)) {
                throw new Error("Invalid calculation");
            }

            display.value = result;
        }

        catch(error) {
            display.value = "Error";
        }
    }

    // Number and operator buttons
    else {
        if (display.value === "Error") {
            display.value = "";
        }

        display.value += value;
    }

});
