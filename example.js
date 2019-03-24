const extract = require('./src/main');

// minimal config
var config = {
    profile: 'BarackObama',
}

extract(config)
    .then(function (twitts){
        console.log(twitts);
    })
    .catch(function (err){
        console.log(err);
    });

// options
config = {
    profile: 'BarackObama',
    showAuthor: true,
    showRetwitts: false,
    showMedia: true,
    noOfTwitts: 26,
}

extract(config)
    .then(function (twitts){
        console.log(twitts);
    })
    .catch(function (err){
        console.log(err);
    });