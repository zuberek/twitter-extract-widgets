const https = require('https');
const Extractor = require('./extractor');

var Fetcher = function(config) {
    this.noOfTwitts = config.noOfTwitts;
    this.url = config.url;
    this.extractor = new Extractor(config);
}

function getTwitts(url) {
    return new Promise(function(resolve, reject) {
        var req = https.get(url, function(res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            res.setEncoding("utf8");
            let body = "";
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(body.slice(22, body.length-2));                    
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

Fetcher.prototype.fetch = function (twitts) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        // base case
        // console.log('\started step:\t' + twitts.length + ' twitts');
        if (twitts.length >= self.noOfTwitts) {
            resolve(twitts);
            return;
        }
            
        getTwitts(self.url)
            .then(function (request){
                var extracted = self.extractor.extract(request.body);
                if(extracted.length === 0) {resolve(twitts); return;} // BREAK IF NO MORE TWITTS!!!
                twitts = twitts.concat(extracted);

                self.url = updateUrl(self.url, request.headers.minPosition);
                self.fetch(twitts)
                    .then(function (recursiveTwitts){
                        // console.log('Finished step:\t' + twitts.length + ' twitts');
                        resolve(recursiveTwitts)
                    });
            })
    });
}

function updateUrl(url, position) {
    var splitted = url.split('&');

    if(splitted[splitted.length-1].slice(0,12) === 'max_position')
        url = url.slice(0, url.length - (splitted[splitted.length-1].length + 1));

    url += '&max_position=' + position;    
    return url;                
}

module.exports = Fetcher;