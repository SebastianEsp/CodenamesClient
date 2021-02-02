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
import { onMounted } from 'vue';
import Button from './Button.vue';
export default {
  components: { Button },
    name: "Chat",
    props: {
        ws: Object
    },
    setup(props){

        onMounted(() => {
            var log = document.getElementById("log");
            props.ws.onmessage = (event) => {
                let message = JSON.parse(event.data)

                switch (message.MsgType) {
                    case "ChatMsg":
                        console.log("Chat message: " + message.Data)
                            var messages = message.Data.split('\n');
                            for (var i = 0; i < messages.length; i++) {
                                var item = document.createElement("div");
                                item.innerText = messages[i];
                                AppendLog(item);
                            }
                        break
                
                    default:
                        break;
                }
            }
        })

        const AppendLog = (item) => {
            var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
            log.appendChild(item);
            if (doScroll) {
                log.scrollTop = log.scrollHeight - log.clientHeight;
            }
        }

        const Send = (msg) => {
            let message = {MsgType: "ChatMsg", Data: msg.target.form[0].value}
            console.log(message)
            props.ws.send(JSON.stringify(message))
        }

        return {
            AppendLog,
            Send
        }
    }
}
</script>