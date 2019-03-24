const Fetcher = require('./fetcher');
const config = require('./config');

module.exports = function extract(userConfig){
    return new Promise(function(resolve, reject) {
        var appConfig = config.setConfig(userConfig);
        if(!appConfig.url) {
            reject('Invalid configuration!');
        }
        
        var fetcher = new Fetcher(appConfig);
        
        var twitts = [];
        twitts = fetcher.fetch(twitts)
            .then(function(twitts) {
                resolve(twitts.slice(0, appConfig.noOfTwitts));
            });
      });   
}

