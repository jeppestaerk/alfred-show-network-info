# alfred-show-network-info 

> Alfred 4 workflow to see network info and discover local devices

[![Travis](https://img.shields.io/travis/jeppestaerk/alfred-show-network-info/master.svg?style=flat-square&label=build%20status)](https://travis-ci.org/jeppestaerk/alfred-show-network-info) [![npm](https://img.shields.io/npm/dt/alfred-show-network-info.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/alfred-show-network-info) [![Github](https://img.shields.io/github/downloads/jeppestaerk/alfred-show-network-info/total.svg?style=flat-square&label=github%20downloads)](https://github.com/jeppestaerk/alfred-show-network-info/releases/latest)

<img src="https://raw.githubusercontent.com/jeppestaerk/alfred-show-network-info/master/preview.png">


## Install

Use `npm`
```
$ npm install --global alfred-show-network-info
```
or download `alfredworkflow` file from [releases](https://github.com/jeppestaerk/alfred-show-network-info/releases/latest)

*Requires [Node.js](https://nodejs.org) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*


## Highlights

- See local-, public-, and gateway ip address.
- Scan and list all devices on local network.
- Copy ip to clipboard.
- Open ip in browser.
- Connect to ip via ssh.
- Toggle functions via Workflow Variables.


## Usage

In Alfred, type `ip4`, <kbd>⏎</kbd>
- press <kbd>⏎</kbd> to copy a ip address.
- press <kbd>⌘</kbd> + <kbd>⏎</kbd> to open ip address in browser.
- press <kbd>⌥</kbd> + <kbd>⏎</kbd> to connect to ip address via ssh.

<img src="https://raw.githubusercontent.com/jeppestaerk/alfred-show-network-info/master/preview.gif">


## Contributions

Please feel free to create a PR and/or make a code review!


## To do

- [x] ~~Find better and more suitable icons~~
- [x] ~~Write workflow readme~~
- [x] ~~Make a presentation gif for readme~~
- [ ] Scan for open ports
- [ ] Spread it to the public on alfred forums ect.
- [ ] *Your idea here*


## Credits

### Modules

- [alfy](https://github.com/sindresorhus/alfy) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/alfy/blob/master/license)
- [internal-ip](https://github.com/sindresorhus/internal-ip) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/internal-ip/blob/master/license)
- [public-ip](https://github.com/sindresorhus/public-ip) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/public-ip/blob/master/license)
- [default-gateway](https://github.com/silverwind/default-gateway) made by [silverwind](https://silverwind.io/) is licensed by [BSD](https://github.com/silverwind/default-gateway/blob/master/LICENSE)
- [local-devices](https://github.com/DylanPiercey/local-devices) made by [Dylan Piercey](https://github.com/DylanPiercey)

### Graphics

- Icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)


## License

MIT © [Jeppe Stærk](https://staerk.io)


<p align="center"><img src="https://raw.githubusercontent.com/jeppestaerk/alfred-show-network-info/master/icon.png" width="64" ></p>
