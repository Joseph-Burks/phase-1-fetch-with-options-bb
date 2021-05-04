To start your json server, run:
npm install -g json-server
then:
json-server --watch db.json

Start by fetching the teams and console.log the response.
Once you are getting the teams, add them to the div with id='team-container' in this format:

<div class='team-card'>
    <h2>Name</h2>
    <p>League</p>
    <p>City</p>
    <p>Country</p>
    <div class='players'>
        <div class='player'>
            <p>Player Name</p>
            <button class='delete-button'>X</button>
        </div>
        <div class='player'>
            <p>Player Name</p>
            <button class='delete-button'>X</button>
        </div>
        <form>
            <label>New Player:</label>
            <input name="name" type="text" />
            <input id='add-player' class="form-button" type="submit" value="Add Player" />
		</form>
    </div>
</div>

Once the teams are showing up, get the add player and delete player buttons working. They should add and remove players from the page as well as the database.

After the team cards are working, get the form working. It should add a team with an empty player array to the backend and display it on the page.
