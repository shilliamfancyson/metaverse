export const world_server = (() =>{
    class SocketWrapper {
        constructor(params) {
            this.socket_ = params.socket;
            this.onMessage = null;
            this.dead_ = false;
            this.SetupSocket_();
        }

        SetupSocket_() {
            this.socket_.on('user-connected', () => {
                console.log('socket.id: ' + socket.id);
            });
            this.socket_.on('disconnect', () => {
                console.log('Client disconnected.');
                this.dead_ = true;
            });
            this.socket_.onAny((e, d) => {
                try {
                  if (!this.onMessage(e, d)) {
                    console.log('Unknown command (' + e + '), disconnected.');
                    this.Disconnect();
                  }
                } catch (err) {
                  console.error(err);
                  this.Disconnect();
                }
              });
            
        }
        Disconnect() {
            this.socket_.disconnect(true);
          }
        
          Send(msg, data) {
            this.socket_.emit(msg, data);
          }
    };

    

})

