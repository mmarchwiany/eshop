const { getGamesAmerica, getGamesEurope, getGamesJapan } = require('nintendo-switch-eshop');

getGamesEurope().then((data) => {
    data.forEach(row => console.info({ id: row.fs_id, title: row.title }))
});