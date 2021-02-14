<template>
<div class="grid justify-items-center">
    <form @submit.prevent="onSubmit">
        <input type="text">
        <input type="submit" value="Send" @click="Send">
    </form>
    <div id="log"></div>
</div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue';
import Button from './Button.vue';
export default {
  components: { Button },
    name: "Chat",
    setup(){
        const app = getCurrentInstance()
        const emitter = app.appContext.config.globalProperties.emitter;
        onMounted(() => {
            var log = document.getElementById("log");
            //Listen for new chat messages
            emitter.on('receive-chat-message', message => {
                console.log("Chat message: " + message)
                var messages = message.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    var item = document.createElement("div");
                    item.innerText = messages[i];
                    AppendLog(item);
                }
            })
        })

        const AppendLog = (item) => {
            var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
            log.appendChild(item);
            if (doScroll) {
                log.scrollTop = log.scrollHeight - log.clientHeight;
            }
        }

        const Send = (msg) => {
            let message = {MsgType: "ChatMsg", Data: {Message: msg.target.form[0].value}}
            //Send new chat message
            emitter.emit('send-chat-message', JSON.stringify(message))
        }

        return {
            AppendLog,
            Send
        }
    }
}
</script>