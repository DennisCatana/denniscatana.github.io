const consultarPartido = () => {
    // Genera una fecha aleatoria en el formato YYYY-MM-DD
    const randomDate = generateRandomDate();

    // URL de la API
    const apiUrl = `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${randomDate}?key=3df70228e29d452591b17fe7efa735e9`;

    // Hacer la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            mostrarPartido(data);
        })
        .catch(error => {
            console.log(error);
        });
};

const btnGenerarPartido = () => {
    consultarPartido();
    document.getElementById("partido-info").style.display = "block";
};

const mostrarPartido = (data) => {
    const game = data[0]; // Suponiendo que obtendrás información sobre un solo juego

    document.getElementById("partido-season").innerHTML = `Temporada: ${game.Season}`;
    document.getElementById("partido-day").innerHTML = `Dia: ${game.Day}`;
    document.getElementById("partido-away-team").innerHTML = `Equipo Visitante: ${game.AwayTeam}`;
    document.getElementById("partido-away-score").innerHTML = `Visitante Score: ${game.AwayTeamScore}`;
    document.getElementById("partido-home-team").innerHTML = `Equipo Anfitrion: ${game.HomeTeam}`;
    document.getElementById("partido-home-score").innerHTML = `Anfitrion Score: ${game.HomeTeamScore}`;

    // Mostrar información de los cuartos
    const quartersContainer = document.getElementById("partido-quarters");
    quartersContainer.innerHTML = ''; // Limpiar contenido anterior

    game.Quarters.forEach((quarter, index) => {
        const quarterHtml = `
          <div class="quarter-container">
            <h3>Quarter ${index + 1}</h3>
            <p>Quarter Number: ${quarter.Number}</p>
            <p>Visitante Score: ${quarter.AwayScore}</p>
            <p>Anfitrion Score: ${quarter.HomeScore}</p>
          </div>
        `;
        quartersContainer.innerHTML += quarterHtml;
    });
};


// Función para generar una fecha aleatoria en el formato YYYY-MM-DD
const generateRandomDate = () => {
    const startDate = new Date(2022, 0, 1); // Ajusta la fecha de inicio según tus necesidades
    const endDate = new Date();
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

