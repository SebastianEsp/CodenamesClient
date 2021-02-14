<template>
    <div v-if="!loading && game.board" class="h-5/6">
        <h1 class="text-center text-6xl text-red-600">RED</h1>
        <h1 class="text-center text-6xl text-blue-700">BLUE</h1>
        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[0]" :key="item" :word="item.Word" :agent="item.Agent" :posX="item.PosX" :posY="item.PosY" @codenameClick="onCodenameClick"></Codename>
        </div>
        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[1]" :key="item" :word="item.Word" :agent="item.Agent" :posX="item.PosX" :posY="item.PosY" @codenameClick="onCodenameClick"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[2]" :key="item" :word="item.Word" :agent="item.Agent" :posX="item.PosX" :posY="item.PosY" @codenameClick="onCodenameClick"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[3]" :key="item" :word="item.Word" :agent="item.Agent" :posX="item.PosX" :posY="item.PosY" @codenameClick="onCodenameClick"></Codename>
        </div>

        <div class="grid grid-cols-5">
            <Codename v-for="item in game.board[4]" :key="item" :word="item.Word" :agent="item.Agent" :posX="item.PosX" :posY="item.PosY" @codenameClick="onCodenameClick"></Codename>
        </div>
        <div>
            <Chat></Chat>
        </div>
    </div>
    <Websocket></Websocket>
</template>

<script>
import { onMounted, ref, reactive, getCurrentInstance } from 'vue';
import Codename from './Codename.vue';
import Chat from './Chat.vue';
import Websocket from './Websocket.vue';
export default {
    name: "Game",
    components: {
        Codename,
        Chat,
        Websocket,
    },
    setup(){
        const app = getCurrentInstance()
        const emitter = app.appContext.config.globalProperties.emitter;
        const game = reactive({
            state: null,
            board: null,
            startingTeam: null,
        })
        const loading = ref(true);

        onMounted(() => {
            //setInterval(GetBoardState, 1000)
            //GetBoardState();
            emitter.on('board-state', e => {
                loading.value = true
                let data = JSON.parse(e);
                game.board = data.Board.Codenames;
                game.startingTeam = data.StartingTeam;
                game.state = data.GameState
                loading.value = false;
            })
            emitter.on('codenames-click', e => onCodenameClick(e))
            emitter.on('update-state', e => {
                console.log(e)
            } )
        })

        const onCodenameClick = (elem) => {
            console.log(elem)
            var x,y
            x = elem.getAttribute("posx")
            y = elem.getAttribute("posy")
            game.board[x][y].State.Guessed = true
            game.board[x][y].State.GuessedBy = game.state.CurrentTeam

            let update = {MsgType: "UpdateState", Data: {codename: game.board[x][y]}}

            emitter.emit('send-state-update', JSON.stringify(update))
        }

        return {
            game,
            loading,
            //GetBoardState,
            //ws,
            onCodenameClick
        };
    }
}
</script>

<style>

</style>