const Extractor = require('../extractor');

var Fetcher = function(config) {
    this.noOfTwitts = config.noOfTwitts;
    this.url = config.url;
    this.extractor = new Extractor(config);

    window.__twttrf = this;
    window.fetcher = this;
}

Fetcher.prototype.fetch = function() {
    var head = document.getElementsByTagName('head')[0];
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.url;
    head.appendChild(script);
}

Fetcher.prototype.callback = function(data) {
    var extracted = this.extractor.extract(data.body);
    console.log('callback');
    console.log(extracted);
    
    
    return extracted

    // check if number of tweets

    // call fetch again
}

module.exports = Fetcher;

// const browserFetcher = {
//     fetch: function(url) {
//         var head = document.getElementsByTagName('head')[0];
//         script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = url;
//         console.log(script.src);
//         head.appendChild(script);
//     },
//     callback: function(data) {
//         console.log(data);

//         // check if number of tweets

//         // call fetch again
//     }
// }