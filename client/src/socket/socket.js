import { io } from "socket.io-client";


export const initSocket = () => {
    const options = {
        'force new connection': false,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io('http://localhost:3000', options);
};