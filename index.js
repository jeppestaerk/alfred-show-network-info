'use strict';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import alfy from 'alfy';
import findLocalDevices from "local-devices";
import defaultGateway from "default-gateway";
import {internalIpV4, internalIpV6} from "internal-ip";

const promises = [];
const output = [];

function addOutput(title, subtitle, arg, icon, action) {
	output.push({
		title: title,
		subtitle: subtitle,
		arg: arg,
		icon: {
			path: `icons/${icon}.png`
		},
		variables: {
			action: action
		}
	})
}

function addIPOutput(type, ip, name, mac) {
	output.push({
		title: `${type}: ${ip} ${name ? `(${name})` : ''}`,
		subtitle: `${mac ? `MAC: ${mac} `  : ''}${process.env['show_actions'] === 'true' ? 'Actions: ⏎ to copy, ⌘⏎ to open, ⌥⏎ to ssh' : ''}`,
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
				arg: `${process.env['keyword']} ssh ${ip} `,
				variables: {
					action: 'rerun'
				}
			}
		},
		icon: {
			path: `icons/${type}.png`
		},
		text: {
			copy: ip,
			largetype: ip
		},
		variables: {
			action: 'copy'
		}
	})
}

if (alfy.input.split(" ")[0].toLowerCase() === 'ssh') {
	addOutput(`Type ssh username for ${alfy.input.split(" ")[1]}`, `ssh ${alfy.input.split(" ")[2] || 'root'}@${alfy.input.split(" ")[1]}`, `ssh ${alfy.input.split(" ")[2] || 'root'}@${alfy.input.split(" ")[1]}`, 'Public', 'ssh')
} else if (alfy.input.toLowerCase() === 'scan') {
	promises.push(findLocalDevices().then(devices => devices.forEach(device => addIPOutput('Device', device.ip, device.name, device.mac))).catch(() => addIPOutput('No local devices found', 'Local')));
} else if (alfy.input.toLowerCase() === 'ipv6') {
	if (process.env['show_public'] === 'true') promises.push(publicIpv6().then(ip => addIPOutput('Public', ip, '', '')).catch(() => addIPOutput('Public', 'IPv6 not found', '', '')));
	if (process.env['show_local'] === 'true') promises.push(internalIpV6().then(ip => addIPOutput('Internal', ip, '', '')).catch(() => addIPOutput('Internal', 'IPv6 not found', '', '')));
	if (process.env['show_gateway'] === 'true') promises.push(defaultGateway.v6().then(ip => addIPOutput('Gateway', ip.gateway, '', '')).catch(() => addIPOutput('Gateway', 'IPv6 not found', '', '')));
} else {
	if (process.env['show_public'] === 'true') promises.push(publicIpv4().then(ip => addIPOutput('Public', ip, '', '')).catch(() => addIPOutput('Public', 'IPv4 not found', '', '')));
	if (process.env['show_local'] === 'true') promises.push(internalIpV4().then(ip => addIPOutput('Internal', ip, '', '')).catch(() => addIPOutput('Internal', 'IPv4 not found', '', '')));
	if (process.env['show_gateway'] === 'true') promises.push(defaultGateway.v4().then(ip => addIPOutput('Gateway', ip.gateway, '', '')).catch(() => addIPOutput('Gateway', 'IPv4 not found', '', '')));
}

Promise.all(promises).then(() => {
	if (!alfy.input) {
		if (process.env['show_scan'] === 'true') addOutput('Discover devices on local network', '', `${process.env['keyword']} scan`, 'Scan', 'rerun');
		if (process.env['show_ipv6'] === 'true') addOutput('See IPv6 network info', '', `${process.env['keyword']} IPv6`, 'IPv6', 'rerun');
		if (process.env['show_contribute'] === 'true') addOutput('Contribute to this workflow on GitHub', 'https://github.com/jeppestaerk/alfred-show-network-info', 'https://github.com/jeppestaerk/alfred-show-network-info#contributions', 'Contribute', 'browser');
	}
	alfy.output(output)
});
