'use strict';
const publicIp = require('public-ip');
const internalIp = require('internal-ip');
const defaultGateway = require('default-gateway');
const alfy = require('alfy');

const promises = [];
const output = [];
const family = process.env.family;

function addOutput(ip, type) {
	output.push({
		title: `${type}: ${ip}`,
		subtitle: '',
		arg: ip,
		icon: {
			path: `${type}.png`
		},
		text: {
			copy: ip,
			largetype: ip
		}
	});
}

if (family === 'IPv6') {
	promises.push(publicIp.v6().then(ip => addOutput(ip, 'Public')).catch(() => addOutput('IPv6 not found', 'Public')));
	promises.push(internalIp.v6().then(ip => addOutput(ip, 'Local')).catch(() => addOutput('IPv6 not found', 'Local')));
	promises.push(defaultGateway.v6().then(ip => addOutput(ip.gateway, 'Gateway')).catch(() => addOutput('IPv6 not found', 'Gateway')));
} else {
	promises.push(publicIp.v4().then(ip => addOutput(ip, 'Public')).catch(() => addOutput('IPv4 not found', 'Public')));
	promises.push(internalIp.v4().then(ip => addOutput(ip, 'Local')).catch(() => addOutput('IPv4 not found', 'Local')));
	promises.push(defaultGateway.v4().then(ip => addOutput(ip.gateway, 'Gateway')).catch(() => addOutput('IPv4 not found', 'Gateway')));
}

Promise.all(promises).then(() => alfy.output(output));
