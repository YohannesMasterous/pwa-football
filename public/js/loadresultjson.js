function resultStanding(data) {
    let seasonStart = new Date(data.season.startDate).toLocaleDateString("id-IN", {
        day: '2-digit', month: 'long', year: 'numeric'
      }).replace(/ /g, ' ')
    let seasonEnd = new Date(data.season.endDate).toLocaleDateString("id-IN", {
        day: '2-digit', month: 'long', year: 'numeric'
      }).replace(/ /g, ' ')
    let lastUpdated = new Date(data.competition.lastUpdated).toLocaleDateString("id-IN", {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit',minute: '2-digit'
      }).replace(/ /g, ' ').replaceAll('.', ':')
    standingHead = `<h6 class="a-font-bold center-align">Season : ${seasonStart} - ${seasonEnd}</h6>
    <h6 class="a-font-bold center-align">Last Updated: ${lastUpdated}</h6><br/>`
    var groupStandingHTML = ''
    data.standings.forEach(function (standing) {
    var standingDetail = ''
    standing.table.forEach(function (club) {
        club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
        standingDetail += `<tr>
            <td class="center-align">${club.position}</td>
            <td class="center-align">
            <a href="./detail.html?id=${club.team.id}">
                <p class="hide-on-small-only">
                    <img class ="show-on-medium-and-up show-on-medium-and-down" style="float:left;width:22px;height:22px" src=${club.team.crestUrl}  alt="logo">
                    ${club.team.name}
                </p>
                <p class="hide-on-med-and-up">
                    <img src=${club.team.crestUrl}  alt="logo" style="float:left;width:22px;height:22px;">
                </p>
            </a>
            </td>
            <td class="center-align">${club.playedGames}</td>
            <td class="center-align">${club.won}</td>
            <td class="center-align">${club.draw}</td>
            <td class="center-align">${club.lost}</td>
            <td class="center-align">${club.goalsFor}</td>
            <td class="center-align">${club.goalsAgainst}</td>
            <td class="center-align">${club.goalDifference}</td>
            <td class="center-align"><b>${club.points}</b></td>
            <td class="center-align">${club.form}</td>
        </tr>`
    })

    groupStandingHTML += `
    <div class="card">
        <div class="card-content">
            <h5 class="center-align"><b>${standing.group.replace("_", " ")}</b></h5>
            <table class="responsive-table striped" >
                <thead>
                <tr>
                    <th class="center-align">Position</th>
                    <th>Team Name</th>
                    <th class="center-align">P</th>
                    <th class="center-align">W</th>
                    <th class="center-align">D</th>
                    <th class="center-align">L</th>
                    <th class="center-align">GF</th>
                    <th class="center-align">GA</th>
                    <th class="center-align">GD</th>
                    <th class="center-align">Pts</th>
                    <th class="center-align">Form</th>
                </tr>
                </thead>
                <tbody>` + standingDetail + `</tbody>
            </table>
        </div>
    </div>`
    });
    standingData = standingHead + groupStandingHTML;
    document.getElementById("footballstanding").innerHTML = standingData;
}

function resultMatches(data) {
    let lastUpdated = new Date(data.competition.lastUpdated).toLocaleDateString("id-IN", {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit',minute: '2-digit'
      }).replace(/ /g, ' ').replaceAll('.', ':')
    matchHead = `<h6 class="a-font-bold center-align">Last Updated: ${lastUpdated}</h6><br/>`
    var groupMatchHTML = ''
    data.matches.forEach(function (match) {
        groupMatchHTML += `
          <div class="col s12 m6 l6">
          <div class="card">
            <div class="card-image grey darken-4">
                <div class="row s12 truncate center-align">
                    <h4 class="center-align white-text">${match.group}</h4>
                    <div class="center-align white-text" style="margin-bottom:10px;"><b>${new Date(match.utcDate).toLocaleDateString("id-IN", {
                        day: '2-digit', month: 'long', year: 'numeric',
                        hour: '2-digit',minute: '2-digit'
                    }).replace(/ /g, ' ').replaceAll('.', ':')}</b></div>
                </div>
            </div>
            <div class="card-content">
                <div class="row s12 truncate center-align">
                    <a href="./detail.html?id=${match.homeTeam.id}">
                        <h5 class="blue-text">${match.homeTeam.name}</h5>
                    </a>
                </div>
                <h4>VS</h4>
                <div class="row s12 truncate center-align">
                    <a href="./detail.html?id=${match.awayTeam.id}">
                        <h5 class="blue-text">${match.awayTeam.name}</h5>
                    </a>
                </div>
            </div>
          </div>
        </div>`
    });
    matchData = matchHead + groupMatchHTML;
    document.getElementById("footballmatch").innerHTML = matchData;
}

function resultTeamDetail(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    document.getElementById("d-teamName").innerHTML = data.name;
    document.getElementById("d-teamLogo").src = data.crestUrl;
    document.getElementById("d-name").innerHTML = data.name;
    document.getElementById("d-shortName").innerHTML = data.shortName;
    document.getElementById("d-tla").innerHTML = data.tla;
    document.getElementById("d-address").innerHTML = data.address;
    document.getElementById("d-phone").innerHTML = data.phone;
    document.getElementById("d-website").innerHTML = data.website;
    document.getElementById("d-email").innerHTML = data.email;
    document.getElementById("d-founded").innerHTML = data.founded;
    document.getElementById("d-clubColors").innerHTML = data.clubColors;
    document.getElementById("d-venue").innerHTML = data.venue;
    document.getElementById("d-preloader").innerHTML = '';
}

function resultFavouriteTeam(data) {
    var dataTeamFavHtml = ''
    data.forEach(function (team) {
        dataTeamFavHtml += `
        <div class="col s12 m6 l6">
            <div class="card grey darken-4" style="border-radius:2%;">
                <div class="card-content">
                    <div center-align>
                        <h5 class="center-align">
                            <a class="white-text" href="./detail.html?id=${team.id}">    
                                <img src="${team.crestUrl}" style="margin-bottom:20px;" alt="logo"/><br/>
                                <span>${team.name}</span>
                            </a>
                        </h5>          
                    </div>
                </div>
            </div>
        </div>
        `
    });

    document.getElementById("footballfavourite").innerHTML = dataTeamFavHtml;
}