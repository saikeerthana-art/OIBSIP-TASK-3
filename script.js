/* ========================================
   GET HTML ELEMENTS
======================================== */

const converterForm = document.getElementById("converterForm");

const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const errorMessage =
    document.getElementById("errorMessage");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");

const resetBtn =
    document.getElementById("resetBtn");


/* ========================================
   FORM SUBMISSION
======================================== */

converterForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Clear previous error
    errorMessage.textContent = "";


    /* ====================================
       GET INPUT
    ==================================== */

    const inputValue = temperatureInput.value.trim();

    const unit = unitSelect.value;


    /* ====================================
       VALIDATE EMPTY INPUT
    ==================================== */

    if (inputValue === "") {

        showError(
            "Please enter a temperature value."
        );

        clearResults();

        temperatureInput.focus();

        return;
    }


    /* ====================================
       VALIDATE NUMERIC INPUT
    ==================================== */

    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {

        showError(
            "Please enter a valid numeric temperature."
        );

        clearResults();

        temperatureInput.focus();

        return;
    }


    /* ====================================
       ABSOLUTE ZERO VALIDATION
    ==================================== */

    let celsius;

    if (unit === "C") {

        celsius = temperature;

    } else if (unit === "F") {

        celsius = (temperature - 32) * 5 / 9;

    } else if (unit === "K") {

        celsius = temperature - 273.15;
    }


    /*
       No temperature can be below
       absolute zero.

       Absolute zero:
       -273.15 °C
       -459.67 °F
       0 K
    */

    if (celsius < -273.15) {

        showError(
            "Invalid temperature: values below absolute zero are not possible."
        );

        clearResults();

        return;
    }


    /* ====================================
       CONVERT TO ALL UNITS
    ==================================== */

    const fahrenheit =
        (celsius * 9 / 5) + 32;

    const kelvin =
        celsius + 273.15;


    /* ====================================
       DISPLAY RESULTS
    ==================================== */

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;

});


/* ========================================
   SHOW ERROR
======================================== */

function showError(message) {

    errorMessage.textContent = message;
}


/* ========================================
   FORMAT NUMBER
======================================== */

function formatNumber(value) {

    /*
       Maximum 2 decimal places.
       Removes unnecessary trailing zeros.
    */

    return Number(value.toFixed(2));
}


/* ========================================
   CLEAR RESULTS
======================================== */

function clearResults() {

    celsiusResult.textContent = "--";

    fahrenheitResult.textContent = "--";

    kelvinResult.textContent = "--";
}


/* ========================================
   RESET
======================================== */

resetBtn.addEventListener("click", function () {

    temperatureInput.value = "";

    unitSelect.value = "C";

    errorMessage.textContent = "";

    clearResults();

    temperatureInput.focus();

});