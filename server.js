#!/usr/bin/env node
// 局域网P2P信令服务器 - 用法: node server.js
// 其他设备连接到 http://<你的IP>:9000
const { ExpressPeerServer } = require('peer');
const express = require('express');
const os = require('os');
const app = express();
const PORT = 9000;
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return '127.0.0.1';
}
const server = app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('');
  console.log('🎮 P2P 信令服务器已启动！');
  console.log('📱 其他设备请连接到: http://' + ip + ':' + PORT);
  console.log('📋 将以下地址填入游戏的"服务器地址"栏: ' + ip + ':' + PORT);
  console.log('💡 确保所有设备在同一WiFi网络下');
});
app.use('/peerjs', ExpressPeerServer(server, { debug: false, allow_discovery: true }));
app.get('/', (req, res) => res.send('🎮 P2P Server Running'));
