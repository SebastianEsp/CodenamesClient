<template>
    <div v-if="!loading && game.board" class="h-5/6">
        <h1 class="text-center text-6xl text-red-600">RED</h1>
        <h1 class="text-center text-6xl text-blue-700">BLUE</h1>
        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[0]" :key="item" :word="item.Word" :agent="item.Agent"></Codename>
        </div>
        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[1]" :key="item" :word="item.Word" :agent="item.Agent"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[2]" :key="item" :word="item.Word" :agent="item.Agent"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[3]" :key="item" :word="item.Word" :agent="item.Agent"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[4]" :key="item" :word="item.Word" :agent="item.Agent"></Codename>
        </div>
        <div>
            <Chat :ws="ws"></Chat>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import Codename from './Codename.vue';
import Chat from './Chat.vue';
export default {
    name: "Game",
    components: {
        Codename,
        Chat
    },
    setup(){
        const game = reactive({
            state: null,
            board: null,
            startingTeam: null
        })
        const loading = ref(true);
        const error = ref(null);

        const ws = new WebSocket("ws://127.0.0.1:8080/ws2/test");
        console.log("Attempting Connection...");

        const GetBoardState = () => {
            loading.value = true;
            let state = null;

            ws.onopen = () => {
                console.log("Successfully Connected");
                //ws.send("Hi From the Client!");
            };

            ws.onmessage = (event) => {
                let message = JSON.parse(event.data)

                switch (message.MsgType) {
                    case "BoardState":
                        state = JSON.parse(message.Data);
                        game.state = state;
                        game.board = state.Board.Codenames;
                        game.startingTeam = state.StartingTeam;
                        break;
                
                    default:
                        break;
                }

                loading.value = false;

                /**var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    var item = document.createElement("div");
                    item.innerText = messages[i];
                    appendLog(item);
                }**/
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

        onMounted(() => {
            //setInterval(GetBoardState, 1000)
            GetBoardState();
        })

        return {
            game,
            loading,
            GetBoardState,
            ws
        };
    }
}
</script>

<style>

</style>