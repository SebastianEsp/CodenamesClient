<script>
import { onMounted, getCurrentInstance } from 'vue';
export default {
    name: "Websocket",
    setup(){
        const app = getCurrentInstance()
        const emitter = app.appContext.config.globalProperties.emitter;

        const ws = new WebSocket("ws://127.0.0.1:8080/ws2/test");
        console.log("Attempting Connection...");

        onMounted(() => {
            HandleSocketConnection();
            emitter.on('send-chat-message', message => {
                ws.send(message)
                console.log("SEND CHAT MESSAGE")
            })
            emitter.on('send-state-update', message => {
                console.log(message)
                console.log("UDPATE STATE")
                ws.send(message)
            })
        })

        const HandleSocketConnection = () => {
            ws.onopen = () => {
                console.log("Successfully Connected");
                //ws.send("Hi From the Client!");
            };

            ws.onmessage = (event) => {
                let message = JSON.parse(event.data)

                switch (message.MsgType) {
                    case "BoardState":
                        console.log(message.Data)
                        //let data = JSON.parse(message.Data);
                        //game.board = data.Board.Codenames;
                        //game.startingTeam = data.StartingTeam;
                        //game.state = data.GameState
                        emitter.emit('board-state', message.Data)
                        break;
                    case "UpdateState":
                        emitter.emit('update-state', message.Data)
                        console.log("UPDATE")
                        break;
                    case "ChatMsg":
                        emitter.emit('receive-chat-message', message.Data.Message)
                    default:
                        break;
                }
            };
            
            ws.onclose = event => {
                console.log("Socket Closed Connection: ", event);
                //ws.send("Client Closed!");
            };

            ws.onerror = error => {
                console.log("Socket Error: ", error);
                throw error;
            };
        }
    }
}
</script>