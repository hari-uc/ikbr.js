import WebSocket from "ws";
import { SOCKET_URL } from "./endpoints";
import { logger } from "./custom.logger";

class SocketClient {
  private socket: WebSocket | null;
  private url: string;
  private options: any;
  private heartBeatInt: NodeJS.Timeout | undefined;
  private eventHandlers: any;
  constructor(url: string, options: any) {
    this.url = url;
    this.options = options;
    this.socket = null;
    this.heartBeatInt = undefined;
    this.eventHandlers = {};
  }

  connect() {
    this.socket = new WebSocket(this.url, this.options);
    this.socket.on("open", () => {
      logger.info("Connected to the socket server");
    });

    this.socket.on("message", (data) => {
      logger.debug(`Received message: ${data}`);
      this.handleMessages(data);
    });

    this.socket.on("close", () => {
      logger.warn("Disconnected from the socket server");
    });
  }

  handleMessages(data: any) {
    let message;
    try {
      message = JSON.parse(data);
    } catch (error) {
      logger.error("Error parsing message");
      return;
    }

    const { topic } = message;

    if (this.eventHandlers[topic]) {
      this.eventHandlers[topic](message);
    } else {
      logger.warn(`No handler for topic: ${topic}`);
    }
  }

  on(topic: string, handler: any) {
    this.eventHandlers[topic] = handler;
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      logger.error("Socket not connected or not ready to send data");
    }
  }

  close() {
    this.socket?.close();
  }

  getSocket() {
    return this.socket;
  }

  startHeartbeat() {
    this.heartBeatInt = setInterval(() => {
      this.send("tic");
    }, 30000);
  }

  stopHeartbeat() {
    clearInterval(this.heartBeatInt);
  }

  reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
}

async function createSocketClient() {
  logger.info("Creating socket client");
  const socketClient = new SocketClient(SOCKET_URL, {
    rejectUnauthorized: false,
  });
  socketClient.connect();
  socketClient.startHeartbeat();
  return socketClient;
}

export { createSocketClient };
