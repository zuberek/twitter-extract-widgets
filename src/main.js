const Fetcher = require('./fetcher');
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

            console.log(appConfig);
            
            
            var fetcher = new Fetcher(appConfig);
            
            var twitts = [];
            fetcher.fetch(twitts)
                .then(function(twitts) {
                    console.log('finished ' + profile);
                    
                    allTwitts[profile] = twitts.slice(0, appConfig.noOfTwitts);
                    
                    if(checkIfFinished(userConfig, allTwitts)) {console.log('FINISHED!'); resolve(allTwitts);}
                });
            });    
      });   
}

function checkIfFinished(userConfig, allTwitts) {
    var isFinished = true
    userConfig.profiles.forEach(profile => {
        console.log('checking' + profile);
        
        if(!allTwitts[profile]) {console.log('missing ' + profile); isFinished = false;}
        // if(allTwitts[profile].length != userConfig.noOfTwitts) return false;
    });
    return isFinished;
}

