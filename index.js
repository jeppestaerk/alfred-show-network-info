'use strict';
const publicIp = require('public-ip');
const internalIp = require('internal-ip');
const defaultGateway = require('default-gateway');
const localDevices = require('local-devices');
const alfy = require('alfy');

const promises = [];
const output = [];

function addOutput(title, subtitle, arg, icon, action) {
	output.push({
		title: title,
		subtitle: subtitle,
		arg: arg,
		icon: {
			path: `${icon}.png`
		},
		variables: {
			action: action
		}
	})
}

function addIPOutput(ip, type) {
	output.push({
		title: `${type}: ${ip}`,
		subtitle: '⏎ to copy, ⌘⏎ to open, ⌥⏎ to ssh',
		arg: ip,
		mods: {
			cmd: {
				subtitle: 'Open in browser',
				arg: `http://${ip}`,
				variables: {
					action: 'browser'
				}
			},
			alt: {
				subtitle: 'Connect via SSH',
				arg: `ssh ${ip} `,
				variables: {
					action: 'rerun'
				}
			}
		},
		icon: {
			path: `${type}.png`
		},
		text: {
			copy: ip,
			largetype: ip
		},
		variables: {
			action: 'copy'
		}
	});
}

function addDevicesOutput(device) {
	output.push({
		title: `Device: ${device.ip} (${device.name})`,
		subtitle: `MAC: ${device.mac}`,
		arg: device.ip,
		mods: {
			cmd: {
				subtitle: 'Open in browser',
				arg: `http://${device.ip}`,
				variables: {
					action: 'browser'
				}
			},
			alt: {
				subtitle: 'Connect via SSH',
				arg: `ssh ${device.ip} `,
				variables: {
					action: 'rerun'
				}
			}
		},
		icon: {
			path: `Local.png`
		},
		text: {
			copy: device.ip,
			largetype: device.ip
		},
		variables: {
			action: 'copy'
		}
	})
}

if (alfy.input.split(" ")[0].toLowerCase() === 'ssh') {
	addOutput(`Type ssh username for ${alfy.input.split(" ")[1]}`, `ssh ${alfy.input.split(" ")[2] || 'root'}@${alfy.input.split(" ")[1]}`, `ssh ${alfy.input.split(" ")[2] || 'root'}@${alfy.input.split(" ")[1]}`, 'Public', 'ssh')
} else if (alfy.input.toLowerCase() === 'scan') {
	promises.push(localDevices().then(devices => devices.forEach(device => addDevicesOutput(device))).catch(() => addIPOutput('No local devices found', 'Local')));
} else if (alfy.input.toLowerCase() === 'ipv6') {
	promises.push(publicIp.v6().then(ip => addIPOutput(ip, 'Public')).catch(() => addIPOutput('IPv6 not found', 'Public')));
	promises.push(internalIp.v6().then(ip => addIPOutput(ip, 'Local')).catch(() => addIPOutput('IPv6 not found', 'Local')));
	promises.push(defaultGateway.v6().then(ip => addIPOutput(ip.gateway, 'Gateway')).catch(() => addIPOutput('IPv6 not found', 'Gateway')));
} else {
	promises.push(publicIp.v4().then(ip => addIPOutput(ip, 'Public')).catch(() => addIPOutput('IPv4 not found', 'Public')));
	promises.push(internalIp.v4().then(ip => addIPOutput(ip, 'Local')).catch(() => addIPOutput('IPv4 not found', 'Local')));
	promises.push(defaultGateway.v4().then(ip => addIPOutput(ip.gateway, 'Gateway')).catch(() => addIPOutput('IPv4 not found', 'Gateway')));
}

Promise.all(promises).then(() => {
	if (!alfy.input) {
		addOutput('Scan for devices on local network', '', 'scan', 'Gateway', 'rerun');
		addOutput('See IPv6 network info', '', 'IPv6', 'Gateway', 'rerun');
	}
	alfy.output(output)
});
