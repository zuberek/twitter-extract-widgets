const extract = require('../src/main')

// minimal config
var config = { profiles: ['BarackObama'] }
extract(config).then(tweets => console.log(tweets))

// options
// config = {
//     profiles: ['BarackObama', 'realDonaldTrump', 'HillaryClinton'], // twitter user name
//     showAuthor: true,
//     showRetweets: false,
//     showMedia: true,
//     noOftweets: 26,
// }

// extract(config)
//     .then(function (tweets){
//         console.log(tweets);
//     })
//     .catch(function (err){
//         console.log(err);
//     });
