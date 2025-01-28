import { io } from 'socket.io-client';

socket.on('connect', () => {
    console.log('Admin Dashboard Connected to socket server');
});

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket']
});