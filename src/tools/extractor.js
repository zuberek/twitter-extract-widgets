const cheerio = require('cheerio');

var Extractor = function(config) {
    this.showAuthor = config.showAuthor;
    this.showRetwitts = config.showRetwitts;
    this.showMedia = config.showMedia;
}

Extractor.prototype.extract = function(body) {
    const $ = cheerio.load(body);
    var twitts = [];
    var self = this;

    $.root().find('.timeline-Tweet').map(function (i, el) {
        // $(this) === el (single raw twitt)

        var twitt = {};
        
        // Check if is retwitt
        if ($(this).find('.timeline-Tweet-retweetCredit').length > 0) {
            twitt.isRetwitt = true;
        } else {
            twitt.isRetwitt = false;
        }

        if (!twitt.isRetwitt || twitt.isRetwitt && self.showRetwitts) {
            twitt.id = $(this).attr('data-tweet-id');
            twitt.body = $(this).find('.timeline-Tweet-text').text();
            twitt.time = $(this).find('.dt-updated').text().slice(6);
            twitt.timestamp = $(this).find('.dt-updated').attr('datetime');
            twitt.link = $(this).find('.timeline-Tweet-timestamp').attr('href');
            if (self.showAuthor) {
                var rawAuthor = $(this).find('.timeline-Tweet-author');
                twitt.author = {};
                twitt.author.name = rawAuthor.find('.TweetAuthor-name').text();
                twitt.author.username = rawAuthor.find('.TweetAuthor-screenName ').text();
                twitt.author.link = rawAuthor.find('.TweetAuthor-link').attr('href');                    
                twitt.author.img = rawAuthor.find('.Avatar').attr('data-src-2x');
            }
            if (self.showMedia) {
                var rawMedia = $(this).find('.timeline-Tweet-media');
                if(rawMedia.hasClass('timeline-Tweet-media')) {
                    twitt.media = [];                        
                    rawMedia.find('img').map(function (i, el){
                        if($(this).attr('data-image'))               
                            twitt.media.push($(this).attr('data-image') + '?format=jpg&name=large');
                    });
                    if(twitt.media.length == 0) delete twitt.media;
                }
            }
        }
        twitts.push(twitt);
    });    
    return twitts;
}

module.exports = Extractor;