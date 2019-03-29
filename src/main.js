const Scraper = require('./tools/scraper');
const config = require('./config');

function extract(userConfig){
    return new Promise(function(resolve, reject) {
        var allTwitts = {};
        
        userConfig.profiles.forEach(profile => {
            var appConfig = config.getConfig(userConfig);
            appConfig.profile = profile;
            appConfig.url = config.getUrl(appConfig);

            if(!appConfig.url) reject('Invalid configuration!');

            var scraper = new Scraper(appConfig);
            
            var twitts = [];
            scraper.getTweets(twitts)
                .then(twitts => {
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

// if run in browser register the method for use
if((typeof window !== 'undefined')) window.extract = extract;
module.exports = extract;