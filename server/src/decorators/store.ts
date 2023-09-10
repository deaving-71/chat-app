import fp from "fastify-plugin";
import { SocketClient, SocketClients, UserData } from "../types";

export class Store {
  socketClients: SocketClients = {};

  forEachSocket(username: string, cb: (socketId: string) => void) {
    this.socketClients[username]?.socketIds.forEach(cb);
  }
  /**
   * add a new client to this socketClients list,
   *  if the client already exists add the client's new socket to their socket list.
   */
  addClient({ id, username }: UserData, newSocketId: string) {
    if (this.socketClients[username]) {
      const socketClient = this.socketClients[username] as SocketClient;
      socketClient.socketIds.push(newSocketId);
    } else {
      this.socketClients[username] = {
        userId: id,
        username,
        socketIds: [newSocketId],
      };
    }
  }

  removeClient(username: string) {
    delete this.socketClients[username];
  }

  /**
   * @returns Returns true if a socket was removed, or false if the socket does not exist.
   * if the sockets list becomes empty we delete the client entirely.
   */
  removeSocket(username: string, socketId: string): boolean {
    const socketClient = this.socketClients[username];
    if (!socketClient) return false;
    const clientSocketList = socketClient.socketIds;
    if (clientSocketList.length < 0) {
      this.removeClient(username);
      return true;
    }
    const newSocketIdsList = clientSocketList.filter((id) => id !== socketId);
    socketClient.socketIds = newSocketIdsList;
    return true;
  }

  /**
   * @returns Returns the client's data and their list of connected sockets if they exist otherwise returns undefined.
   */
  getClientById(id: string) {
    const clients = Object.values(this.socketClients);
    const target = clients.find((client) => client.userId === id);
    return target;
  }

  getClientByUsername(username: string) {
    return this.socketClients[username];
  }
}

const store = new Store();

export default fp<Store>(async (app) => {
  app.decorate("store", store);
});
