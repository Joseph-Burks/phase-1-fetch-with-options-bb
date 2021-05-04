const teamsURL = 'http://localhost:3000/teams/';

fetch(teamsURL)
	.then(res => res.json())
	.then(teams => {
		teams.forEach(team => buildCard(team));
	});

const buildCard = team => {
	const teamCard = document.createElement('div');
	teamCard.className = 'team-card';

	const teamName = document.createElement('h2');
	teamName.innerText = team.name;

	const league = document.createElement('p');
	league.innerText = team.league;

	const city = document.createElement('p');
	city.innerText = team.city;

	const country = document.createElement('p');
	country.innerText = team.country;

	const players = document.createElement('div');
	players.className = 'players';
	team.players.forEach(player => createPlayer(player, players, team));

	const playerForm = document.createElement('form');

	const label = document.createElement('label');
	label.innerText = 'New Player:';

	const nameInput = document.createElement('input');
	nameInput.name = 'name';
	nameInput.type = 'text';

	const submitButton = document.createElement('input');
	submitButton.id = 'add-player';
	submitButton.className = 'form-button';
	submitButton.type = 'submit';
	submitButton.value = 'Add Player';

	playerForm.addEventListener('submit', event => {
		event.preventDefault();
		const newPlayerName = event.target[0].value;
		createPlayer(newPlayerName, players, team);

		team.players.push(newPlayerName);

		let options = {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				players: team.players,
			}),
		};

		fetch(teamsURL + team.id, options);
        playerForm.reset()
	});

	playerForm.append(label, nameInput, submitButton);
	players.append(playerForm);

	teamCard.append(teamName, league, city, country, players);

	const teamsContainer = document.querySelector('#teams-container');
	teamsContainer.append(teamCard);
};

const createPlayer = (player, players, team) => {
	const playerDiv = document.createElement('div');
	playerDiv.className = 'player';
	console.log(playerDiv);
	const playerName = document.createElement('p');
	playerName.innerText = player;

	const deleteButton = document.createElement('button');
	deleteButton.className = 'delete-button';
	deleteButton.innerText = 'X';
	deleteButton.addEventListener('click', () => {
		playerDiv.remove();

		let index = team.players.indexOf(player);
		team.players.splice(index, 1);

        //another way to edit the array of players
        // let newPlayers = team.players.filter(p => p !== player)
        // then the body in options can be {players: newPlayers}

		let options = {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				players: team.players,
			}),
		};
		fetch(teamsURL + team.id, options);
	});

	playerDiv.append(playerName, deleteButton);

	players.prepend(playerDiv);
};

const newTeamForm = document.querySelector('#new-team-form');
newTeamForm.addEventListener('submit', event => {
	event.preventDefault();

	let newTeam = {
		name: event.target[0].value,
		league: event.target[1].value,
		city: event.target[2].value,
		country: event.target[3].value,
		players: [],
	};

	let options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newTeam),
	};

	fetch(teamsURL, options)
		.then(res => res.json())
		.then(team => {
            console.log(team)
            buildCard(team)
        });
    
    newTeamForm.reset()
});
