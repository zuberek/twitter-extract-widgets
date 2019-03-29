const Fetcher = require('./tools/fetchers/https');
const config = require('./config');

module.exports = function extract(userConfig){
    return new Promise(function(resolve, reject) {
        var allTwitts = {};
        
        userConfig.profiles.forEach(profile => {
            var appConfig = config.getConfig(userConfig);
            appConfig.profile = profile;
            appConfig.url = config.getUrl(appConfig);

            if(!appConfig.url) {
                reject('Invalid configuration!');
            }

            var fetcher = new Fetcher(appConfig);
            
            var twitts = [];
            fetcher.fetch(twitts)
                .then(function(twitts) {
                    allTwitts[profile] = twitts.slice(0, appConfig.noOfTwitts);
                    
                    if(checkIfFinished(userConfig, allTwitts)) resolve(allTwitts);
                });
            });    
      });   
}

function checkIfFinished(userConfig, allTwitts) {
    var isFinished = true
    userConfig.profiles.forEach(profile => {
        if(!allTwitts[profile]) isFinished = false;
    });
    return isFinished;
}

