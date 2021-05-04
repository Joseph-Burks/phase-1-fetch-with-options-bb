const teamsURL = 'http://localhost:3000/teams/'

fetch(teamsURL)
.then(res => res.json())
.then(teams => {
    teams.forEach(team => buildCard(team))
})

const buildCard = team => {
    const teamCard = document.createElement('div')
    teamCard.className = 'team-card'

    const teamName = document.createElement('h2')
    teamName.innerText = team.name

    const league = document.createElement('p')
    league.innerText = team.league

    const city = document.createElement('p')
    city.innerText = team.city

    const country = document.createElement('p')
    country.innerText = team.country

    const players = document.createElement('div')
    players.className = 'players'
    team.players.forEach(player => createPlayer(player, players))

    const playerForm = document.createElement('form')

    const label = document.createElement('label')
    label.innerText = 'New Player:'

    const nameInput = document.createElement('input')
    nameInput.name = 'name'
    nameInput.type = 'text'

    const submitButton = document.createElement('input')
    submitButton.id = 'add-player'
    submitButton.className = 'form-button'
    submitButton.type = 'submit'
    submitButton.value = 'Add Player'

    playerForm.append(label, nameInput, submitButton)
    players.append(playerForm)

    teamCard.append(teamName, league, city, country, players )

    const teamsContainer = document.querySelector('#teams-container')
    teamsContainer.append(teamCard)
}

const createPlayer = (player, players) => {
    const playerDiv = document.createElement('div')
    playerDiv.className = 'player'

    const playerName = document.createElement('p')
    playerName.innerText = player

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.innerText = 'X'

    playerDiv.append(playerName, deleteButton)

    players.append(playerDiv)
}