'use strict';
const os = require('os');
const publicIp = require('public-ip');
const alfy = require('alfy');

const promises = [];
const output = [];
const networkInfo = os.networkInterfaces();

function getExternalIp() {
	return publicIp.v4().then(ip => addOutput(ip, 'Public IP'));
}

function addOutput(title, subtitle) {
	output.push({
		title: title,
		subtitle: '',
		arg: title,
		mods: {
			cmd: {
				subtitle: subtitle
			}
		},
		icon: {
			path: 'icon.png'
		},
		text: {
			copy: title,
			largetype: title
		}
	});
}

promises.push(getExternalIp());

for (const [key, value] of Object.entries(networkInfo)) {
	value.forEach(obj => {
		if (obj['family'] === 'IPv4' && key !== 'lo0') {
			addOutput(obj['address'], `${key} ${obj['mac']}`);
		}
	});
}

Promise.all(promises).then(() => alfy.output(output));

