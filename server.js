const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server,
    {
        cors: {
            origin: "*"
        }
    });

class ConnectedUser {
    constructor(socket){
        this.id_ = _USERS.length;
        this.pos_ = [Math.random() * 20, 0, Math.random() * 20];
        this.socket_ = socket;
        this.socket_.on('pos', (d) => {
            this.pos_ = [...d];
            this.UpdateClients_();

        
        });
        this.UpdateClients_();
        

    }

    UpdateClients_() {
        this.socket_.emit('pos', this.pos_);

        for (let i = 0; i < _USERS.length; ++i){
            _USERS[i].socket_.emit('pos', [this.id_,this.pos_]);
            this.socket_.emit('pos', [_USERS[i].id_,_USERS[i].pos_]);
        }
    }
}

const _USERS = [];

io.on('connection', (socket) => {
    console.log('user connected');
    _USERS.push(new ConnectedUser(socket));
    // for (let i = 0; i < _USERS.length; ++i){
    //     console.log(_USERS[i])
    //     console.log(Math.random() * 20)
    // }
})

server.listen(3000, ()=> {
    console.log("Listenting on 3000...");
} )