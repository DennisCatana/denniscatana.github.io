async function searchWord() {
    var searchInput = document.getElementById('searchWord').value;

    if (!searchInput) {
        showErrorAlert('Please enter a word..');
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
        const result = await response.json();

        if (result.length === 0) {
            showWarningAlert('No results were found for the word entered.');
            return;
        }

        displayWordDetails(result[0]);
    } catch (error) {
        console.error('Error:', error);
        showErrorAlert('An error occurred while searching.(Word not found)');
    }
}

function showWarningAlert(message) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: message,
        confirmButtonColor: '#bf500c' ,
        customClass: {
            popup: 'small-alert',
        },
    });
}

function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#bf500c' ,
        customClass: {
            popup: 'small-alert',
        },
    });
}

function displayWordDetails(wordDetails) {
    var wordDetailsContainer = document.getElementById('wordDetails');
    wordDetailsContainer.innerHTML = ''; 

    var card = document.createElement('div');
    card.className = 'card';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerText = `Word: ${wordDetails.word}`;

    var pronunciationsList = document.createElement('ul');
    pronunciationsList.className = 'list-group list-group-flush';

    for (const phonetic of wordDetails.phonetics) {
        var pronunciationItem = document.createElement('li');
        pronunciationItem.className = 'list-group-item pronunciation-item';
        pronunciationItem.innerHTML = `<strong>Phonetics:</strong> ${phonetic.text}`;
        
        if (phonetic.audio) {
            var audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.innerHTML = `<source src="${phonetic.audio}" type="audio/mpeg">Your browser does not support the audio element.`;
            pronunciationItem.appendChild(audioElement);
        }

        pronunciationsList.appendChild(pronunciationItem);
    }

    var originInfo = document.createElement('div');
    originInfo.className = 'mt-4';
    originInfo.innerHTML = `<h5>Origin</h5><p>${wordDetails.origin}</p>`;

    var meaningsList = document.createElement('div');
    meaningsList.className = 'mt-4';
    meaningsList.innerHTML = `<h5>Meanings</h5>`;

    for (const meaning of wordDetails.meanings) {
        var meaningItem = document.createElement('div');
        meaningItem.className = 'card mb-3';

        var meaningCardBody = document.createElement('div');
        meaningCardBody.className = 'card-body';

        var partOfSpeechTitle = document.createElement('h6');
        partOfSpeechTitle.className = 'mb-2';
        partOfSpeechTitle.innerText = `${meaning.partOfSpeech}`;

        var definitionInfo = document.createElement('p');
        definitionInfo.innerHTML = `<strong>Definición:</strong> ${meaning.definitions[0].definition}<br>`;
        definitionInfo.innerHTML += `<strong>Ejemplo:</strong> ${meaning.definitions[0].example}`;

        meaningCardBody.appendChild(partOfSpeechTitle);
        meaningCardBody.appendChild(definitionInfo);
        meaningItem.appendChild(meaningCardBody);

        meaningsList.appendChild(meaningItem);
    }

    // Agrega elementos al contenedor
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(pronunciationsList);
    card.appendChild(cardBody);
    wordDetailsContainer.appendChild(card);
    wordDetailsContainer.appendChild(originInfo);
    wordDetailsContainer.appendChild(meaningsList);
}