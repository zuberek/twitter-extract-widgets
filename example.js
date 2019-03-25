const extract = require('./src/main');

// minimal config
var config = { profiles: ['BarackObama'] }
extract(config).then(twitts => console.log(twitts))

// options
config = {
    profiles: ['BarackObama', 'realDonaldTrump', 'HillaryClinton'], // twitter user name
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