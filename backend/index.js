const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory store for the latest sensor data
let latestSensorData = {
    heartRate: null,
    spO2: null,
    temperature: null,
    gsr: null,
    motionMagnitude: null,
    latitude: null,
    longitude: null,
    riskScore: null,
    timestamp: null
};

// Offline detection logic
const OFFLINE_TIMEOUT_MS = 60000; // 60 seconds
let lastMessageTime = Date.now();
let isDeviceOnline = false;

// Broadcast data to all connected WebSocket clients
const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Interval to check if device is online
setInterval(() => {
    const timeSinceLastMessage = Date.now() - lastMessageTime;
    const currentlyOnline = timeSinceLastMessage < OFFLINE_TIMEOUT_MS;
    
    if (currentlyOnline !== isDeviceOnline) {
        isDeviceOnline = currentlyOnline;
        console.log(`Device is now ${isDeviceOnline ? 'ONLINE' : 'OFFLINE'}`);
        broadcast({ type: 'status', isOnline: isDeviceOnline });
    }
}, 5000); // Check every 5 seconds

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    // Send immediate status and latest data upon connection
    ws.send(JSON.stringify({ type: 'status', isOnline: isDeviceOnline }));
    ws.send(JSON.stringify({ type: 'vitals', data: latestSensorData }));
});

// ThingSpeak REST API configuration
const THINGSPEAK_CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
const THINGSPEAK_READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;
const THINGSPEAK_API_URL = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json`;

// Function to fetch data from ThingSpeak REST API
const fetchThingSpeakData = async () => {
    try {
        if (!THINGSPEAK_CHANNEL_ID || THINGSPEAK_CHANNEL_ID === 'YOUR_CHANNEL_ID') {
            console.warn('THINGSPEAK_CHANNEL_ID is not properly configured in .env');
            return;
        }
        if (!THINGSPEAK_READ_API_KEY || THINGSPEAK_READ_API_KEY === 'YOUR_READ_API_KEY') {
            console.warn('THINGSPEAK_READ_API_KEY is not properly configured in .env');
            return;
        }

        const response = await fetch(`${THINGSPEAK_API_URL}?api_key=${THINGSPEAK_READ_API_KEY}&results=1`);
        
        if (!response.ok) {
            console.error(`ThingSpeak API error: ${response.status} ${response.statusText}`);
            return;
        }

        const result = await response.json();
        
        if (result.feeds && result.feeds.length > 0) {
            const data = result.feeds[0];
            console.log('Received data from ThingSpeak:', data);

            // Map ThingSpeak fields to sensor values
            if (data.field1 !== undefined && data.field1 !== null) latestSensorData.heartRate = parseFloat(data.field1);
            if (data.field2 !== undefined && data.field2 !== null) latestSensorData.spO2 = parseFloat(data.field2);
            if (data.field3 !== undefined && data.field3 !== null) latestSensorData.temperature = parseFloat(data.field3);
            if (data.field4 !== undefined && data.field4 !== null) latestSensorData.gsr = parseFloat(data.field4);
            if (data.field5 !== undefined && data.field5 !== null) latestSensorData.motionMagnitude = parseFloat(data.field5);
            if (data.field6 !== undefined && data.field6 !== null) latestSensorData.latitude = parseFloat(data.field6);
            if (data.field7 !== undefined && data.field7 !== null) latestSensorData.longitude = parseFloat(data.field7);
            if (data.field8 !== undefined && data.field8 !== null) latestSensorData.riskScore = parseFloat(data.field8);
            
            latestSensorData.timestamp = data.created_at || new Date().toISOString();
            
            // Update device status
            lastMessageTime = Date.now();
            if (!isDeviceOnline) {
                isDeviceOnline = true;
                console.log('Device is now ONLINE');
                broadcast({ type: 'status', isOnline: isDeviceOnline });
            }
            
            // Broadcast the new vitals
            broadcast({ type: 'vitals', data: latestSensorData });
        }
    } catch (err) {
        console.error('Error fetching data from ThingSpeak:', err);
    }
};

// Poll ThingSpeak REST API every 15 seconds
setInterval(fetchThingSpeakData, 15000);

// Fetch data immediately on startup
fetchThingSpeakData();

// API endpoint to get the latest vitals
app.get('/api/vitals', (req, res) => {
    res.json({
        isOnline: isDeviceOnline,
        data: latestSensorData
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
