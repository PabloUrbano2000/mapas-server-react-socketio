const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;
    this.marcadores = new Marcadores();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // marcadores-activos
      socket.emit("marcadores-activos", this.marcadores.activos);
      // marcador-nuevo
      socket.on("marcador-nuevo", (marcador) => {
        // {id, lng, lat}
        this.marcadores.agregarMarcador(marcador);
        // con broadcast le emite a todos menos al socket en cliente que lo emitió
        socket.broadcast.emit("marcador-nuevo", marcador);
      });
      // marcador-actualizado
      socket.on("marcador-actualizado", (marcador) => {
        this.marcadores.actualizarMarcador(marcador);
        socket.broadcast.emit("marcador-actualizado", marcador);
      });
    });
  }
}

module.exports = Sockets;
