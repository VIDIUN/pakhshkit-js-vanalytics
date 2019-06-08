# PakhshKit JS VAnalytics - Vidiun Analytics plugin for the [PakhshKit JS Player]

[![Build Status](https://travis-ci.org/vidiun/pakhshkit-js-vanalytics.svg?branch=master)](https://travis-ci.org/vidiun/pakhshkit-js-vanalytics)

PakhshKit JS VAnalytics plugin integrates Vidiun analytics with the [PakhshKit JS Player].
 
PakhshKit JS VAnalytics is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

More info about Vidiun Analytics: 
* [Video-Analytics]
* [Creating and tracking analytics VMC]

[Video-Analytics]: https://corp.vidiun.com/Products/Features/Video-Analytics
[Creating and tracking analytics VMC]: https://knowledge.vidiun.com/creating-and-tracking-analytics-vmc-0
[Flow]: https://flow.org/
[ECMAScript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[Babel]: https://babeljs.io

## Getting Started

### Prerequisites
The plugin requires [PakhshKit JS Player] to be loaded first.

[Pakhshkit JS Player]: https://github.com/vidiun/pakhshkit-js

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/vidiun/pakhshkit-js-vanalytics.git
cd pakhshkit-js-vanalytics
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the library in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/pakhshkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/pakhshkit-vanalytics.js"></script>
<div id="player-placeholder" style="height:360px; width:640px">
<script type="text/javascript">
var playerContainer = document.querySelector("#player-placeholder");
var config = {
 ...
 plugins: {
   vanalytics: { 
     serviceUrl: 'http://stats.vidiun.com/api_v3/index.php'
   }
 }
 ...
};
var player = pakhshkit.core.loadPlayer(config);
playerContainer.appendChild(player.getView());
player.play();
</script>
```

## Configuration

| Settings 	| Type   	| Required           	| Description                	|
|----------	|--------	|--------------------	|----------------------------	|
| serviceUrl    	| string 	| :white_check_mark: 	| The Vidiun API server url 	|

## Running the tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari

[Karma]: https://karma-runner.github.io/1.0/index.html
```
yarn run test
```

You can test individual browsers:
```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And coding style tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.


## Compatibility

TBD

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/vidiun/pakhshkit-js-vanalytics/tags). 

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
