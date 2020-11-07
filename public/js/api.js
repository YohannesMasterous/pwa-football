var base_url = "https://api.football-data.org/v2/";
let token = '28ea1b20ae884c20960093c8caeb60b2';
var id_liga = 2001;
var endpoint_standings = `${base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
var endpoint_matches = `${base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
var endpoint_team = `${base_url}teams/`;

var fetchData = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': token
        }
    });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(endpoint_standings).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            resultStanding(data);
            resolve(data);
          });
        }
      });
    }

    fetchData(endpoint_standings)
      .then(status)
      .then(json)
      .then(function(data) {
        resultStanding(data);
        resolve(data);
      })
      .catch(error);
  });
}

function getMatches() {
  if ("caches" in window) {
    caches.match(endpoint_matches).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          resultMatches(data);
        });
      }
    });
  }

  fetchData(endpoint_matches)
    .then(status)
    .then(json)
    .then(function(data) {
      resultMatches(data);
    })
    .catch(error);
}

function getDetailTeamById() {
  return new Promise(function (resolve, reject) {
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");
      var dataSquadHTML = ''
      var tableSquadHTML = ''
      if ("caches" in window) {
          caches.match(endpoint_team + idParam).then(function (response) {
              if (response) {
                  response.json().then(function (data) {
                    resultTeamDetail(data)
                    data.squad.forEach(function (squad, index) {
                        dataSquadHTML += `
                        <tr>
                            <td>${index+1}. </td>
                            <td>${squad.name}</td>
                            <td>${squad.position}</td>
                        </tr>`
                    });
                    
                    tableSquadHTML = `
                    <table class="responsive-table striped" >
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Position</th>
                        </tr>
                        </thead>
                        <tbody>${dataSquadHTML}</tbody>
                    </table>`
        
                    document.getElementById("squad").innerHTML = tableSquadHTML;
                    resolve(data);
                  });
              }
          });
      }

      fetchData(endpoint_team + idParam)
          .then(status)
          .then(json)
          .then(function (data) {
              resultTeamDetail(data)
              dataSquadHTML = ''
              data.squad.forEach(function (squad, index) {
                  dataSquadHTML += `
                  <tr>
                      <td>${index+1}. </td>
                      <td>${squad.name}</td>
                      <td>${squad.position}</td>
                  </tr>`
              });
              tableSquadHTML = `
              <table class="responsive-table striped" >
                  <thead>
                  <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Position</th>
                  </tr>
                  </thead>
                  <tbody>${dataSquadHTML}</tbody>
              </table>`

              document.getElementById("squad").innerHTML = tableSquadHTML;
              resolve(data);
          })
          .catch(error);
  });
}