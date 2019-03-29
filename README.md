# twitter-extract-widgets
[![npm (scoped)](https://img.shields.io/npm/v/twitter-extract-widgets.svg)](https://www.npmjs.com/package/twitter-extract-widgets)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/twitter-extract-widgets.svg)](https://www.npmjs.com/package/twitter-extract-widgets)
[![npm downloads](https://img.shields.io/npm/dt/twitter-extract-widgets.svg)](https://www.npmjs.com/package/twitter-extract-widgets)
[![npm licence](https://img.shields.io/npm/l/twitter-extract-widgets.svg)](https://www.npmjs.com/package/twitter-extract-widgets)

Extract information from Twitter Widgets

## Install

```
$ npm install twitter-extract-widgets
```

## Usage

### Node
```js
const extract = require("twitter-extract-widgets");

// minimal config
var config = { profiles: ['BarackObama'] }
extract(config).then(twitts => console.log(twitts))
```

### Browser
```html
<script type="text/javascript" src="twitter-extract-widgets"></script>
<script type="text/javascript">
    var config = { profiles: ['BarackObama'] }
    extract(config).then(tweets => console.log(tweets))
</script>
```

## Configuration

```js
config = {
    profiles: ['BarackObama', 'realDonaldTrump', 'HillaryClinton'], // twitter user name
    showAuthor: true,
    showRetwitts: false,
    showMedia: true,
    noOfTwitts: 26,
}

// return format
{ BarackObama:
    [   {   isRetwitt: false,
            id: '1098659030204116992',
            body:
            'It’s up to all of us as citizens to make sure that the rules of democracy are fair—everywhere'
            'because the next decade of our nation\'s progress is on the line. Join me and @allontheline'
            'in the fight against gerrymandering: http://allontheline.org .',
            time: 'Feb 21, 2019',
            timestamp: '2019-02-21T19:01:39+0000',
            link: 'https://twitter.com/BarackObama/status/1098659030204116992',
            author:
                {   name: 'Barack Obama',
                    username: '@BarackObama',
                    link: 'https://twitter.com/BarackObama',
                    img: 'https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_bigger.jpg' },
            media: [ 'https://pbs.twimg.com/media/Dz8fnh5WwAY4WB1?format=jpg&name=large' ] },
        {...}   ]   }
```