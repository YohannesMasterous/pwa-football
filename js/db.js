var dbPromised = idb.open("dbfootball", 1, function(upgradeDb) {
  var footballObjectStore = upgradeDb.createObjectStore("fav_team", {
    keyPath: "id"
  });
  footballObjectStore.createIndex("team_data", "name", {
    unique: false
  });
});

function checkData(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
          var tx = db.transaction("fav_team", "readonly");
          var store = tx.objectStore("fav_team");
          return store.get(id);
      })
      .then(function (data) {
          if (data != undefined) {
              resolve(data)
          } else {
              reject("Bukan data favorit")
          }
      });
  });
}

function saveForLater(team) {
  detailData = {
      id: team.id,
      name: team.name,
      shortName: team.shortName,
      tla: team.tla,
      crestUrl: team.crestUrl,
      address: team.address,
      phone: team.phone,
      website: team.website,
      email: team.email,
      founded: team.founded,
      clubColors: team.clubColors,
      venue: team.venue,
      squad: team.squad
  }
  dbPromised
    .then(function(db) {
      var tx = db.transaction("fav_team", "readwrite");
      var store = tx.objectStore("fav_team");
      store.put(detailData);
      return tx.complete;
    })
    .then(function() {
      console.log("Favourite team berhasil di simpan.");
      document.getElementById("iconFav").innerHTML = "favorite";
      document.getElementById("textFav").innerHTML = " Hapus Dari Favorit";
      M.toast({
        html: `${team.name} berhasil disimpan ke Favorit!`
      });
      const title = 'Football MST Notifikasi';
      const options = {
          'body': `${team.name} berhasil disimpan ke Favorit!`,
          'icon': '/images/icon-512.png'
      };
      navigator.serviceWorker.getRegistration().then(function (reg) {
          reg.showNotification(title, options);
      });
    });
}

function deleteDatafav(id, name) {
  dbPromised.then(function (db) {
      var tx = db.transaction("fav_team", 'readwrite');
      var store = tx.objectStore("fav_team");
      store.delete(id);
      return tx.complete;
  }).then(function () {
      console.log('Item deleted');
      document.getElementById("iconFav").innerHTML = "favorite_border";
      document.getElementById("textFav").innerHTML = " Tambah Ke Favorit";
      M.toast({
          html: `${name} berhasil dihapus dari Favorit!`
      });
      const title = 'Football MST Notifikasi';
      const options = {
          'body': `${name} berhasil dihapus dari Favorit!`,
          'icon': '/images/icon-512.png'
      };
      navigator.serviceWorker.getRegistration().then(function (reg) {
          reg.showNotification(title, options);
      });
  });
}

function getSavedDataById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = Number(urlParams.get("id"));
  var dataSquadHTML = ''
  var tableSquadHTML = ''
  getTeamById(idParam).then(function (team) {
      resultTeamDetail(team);
      team.squad.forEach(function (squad, index) {
          dataSquadHTML += `
          <tr>
              <td>${index+1}. </td>
              <td>${squad.name}</td>
              <td>${squad.position}</td>
          </tr>`
      });
      tableSquadHTML += `
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
  })
}

function getTeamById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
          var tx = db.transaction("fav_team", "readonly");
          var store = tx.objectStore("fav_team");
          return store.get(id);
      })
      .then(function (data) {
          resolve(data);
      });
  });
}

function getAllTeam() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
          var tx = db.transaction("fav_team", "readonly");
          var store = tx.objectStore("fav_team");
          return store.getAll();
      })
      .then(function (data) {
          resolve(data);
      });
  });
}

function getFavouriteData() {
  getAllTeam().then(function (data) {
    resultFavouriteTeam(data);
  });    
}
