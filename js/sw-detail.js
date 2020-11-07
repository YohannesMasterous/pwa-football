document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible.expandable');
    var instances = M.Collapsible.init(elems, {
        accordion: false
    });
});

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = Number(urlParams.get("id"));
    var isFavorit = false;
    checkData(id).then((msg) => {
        console.log("statusData: Resolve = " + msg);
        document.getElementById("iconFav").innerHTML = "favorite";
        document.getElementById("textFav").innerHTML = " Hapus Dari Favorit"
        getSavedDataById()
        isFavorit = true
    }).catch((msg) => {
        console.log("statusData: Reject = " + msg);
        document.getElementById("iconFav").innerHTML = "favorite_border";
        document.getElementById("textFav").innerHTML = " Tambah Ke Favorit"
        getDetailTeamById()
        isFavorit = false
    })

    var btnFav = document.getElementById("btnFav");
    btnFav.onclick = function () {
        console.log("Tombol Favorit di klik.");
        if (isFavorit) {
            var team_name = document.getElementById("d-name").innerHTML;
            deleteDatafav(id, team_name);
            isFavorit = false
        } else {
            items = getDetailTeamById();
            // console.log(items);
            items.then(function (team) {
                saveForLater(team);
            });
            isFavorit = true
        }
    };
});