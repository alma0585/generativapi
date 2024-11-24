const OPENAI_API_KEY = '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';
const princessDisplay = document.querySelector(".generated-princess p");

// Funktion til at generere prinsesseteksten.
function logSuggestion(text) {
    const query = 'Jeg vil gerne have at du genere en prinsesse. Prinsessen skal have et rigtigt prinsesse agtigt navn og titel, der skal også være en beskrivelse af hvor prinsessen bor.  Der skal også stå noget om prinsessens hobbyer og hvad prinsessen bruger sin tid på. Den skal også fortælle om prinsessens bedste veninde og prinsessens kæledyr. Tilsidst skal du tilføje hvad prisessen vil blive husket for. Du skal gøre det ud fra følgende tekst: ' + text;

    princessDisplay.innerHTML = `<span class="loading"><p>Magien er i gang...</p>`;
    princessDisplay.style.textAlign = "center"

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: query
            }]
        })
    })
        .then(response => response.json())
        .then(suggestionData => {
            const princessDescription = suggestionData.choices[0].message.content;

            // Vis den genererede tekst på websiden

            princessDisplay.textContent = princessDescription;
            princessDisplay.style.textAlign = "left"

            // Generér billede baseret på den genererede beskrivelse
            generatePrincessImage(princessDescription);
        })
        .catch(error => console.error('Error:', error));
}

// Eventlistener til knapklik
document.querySelector("button").addEventListener('click', function () {
    const inputfelt = document.querySelector("textarea");
    if (inputfelt.value === "") {
        princessDisplay.textContent = "Du skal skrive noget først"
        princessDisplay.style.textAlign = "center"
    } else {
        logSuggestion(inputfelt.value); // Send input til tekstgenerering
        inputfelt.value = ""; // Ryd tekstfeltet
    }

});


