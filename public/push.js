var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAt8JPTcMtnaMj9vqw9_oh_g9QzWhcm2aZV4PZMwOjOz7pZA4CASZE7OtTv9XsjCUR9hBV3y5zBb13Ig4QC-umo",
    "privateKey": "geTlqd3havOHXwJFFzzlvG3EtNIaNRNMsf4MhVfS1AU"
};
  
webPush.setVapidDetails(
    'mailto:yohannesmasterous@mdp.ac.id',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eqTR2OM6NDY:APA91bGCSTR63LTmjknVKs6ppijxmoWtE2Kc65Y6oEyWqrFB5fb6MGT2lXjka5Zws0M49UeACw15JXy9h0xENhRvuYR-goaOtD63hcpUqHBC_Tg49k0Puup27zuoda2RLSN1So-Bjqvt",
    "keys": {
        "p256dh": "BA8fYv8rH+3eWh6e5tg/edqyZg7FBCMB/hYvA0df2QtE9UKkR+6BFXO9JLKKcCTtgttfvT5le2fsgiStLCwoI/E=",
        "auth": "ji9coc9uuxrctH8k1wtPHA=="
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '697428047771',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);