<template>
    <div :class="color" class="bg-gray-800 m-5 p-10 rounded-md cursor-pointer" @click="CodenameClick">
        <p class="text-white text-base font-medium text-center flex justify-center">{{word}}</p>
    </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
export default {
    name: "Codename",
    props: {
        word: String,
        agent: String,
        isSpymaster: Boolean,
    },
    setup(props){
        const app = getCurrentInstance()
        const emitter = app.appContext.config.globalProperties.emitter;
        const color = ref(0)

        let showColors = "";

        console.log(props.isSpymaster)

        if(props.isSpymaster){
            showColors = "play-animation"
        }

        switch (props.agent) {
            case "Red":
                color.value = showColors + " anim-color-red border-8 border-gray-900"
                break;
            
            case "Blue":
                color.value = showColors + " anim-color-blue border-8 border-gray-900"
                break;

            case "Bystander":
                color.value = showColors + " anim-color-bystander border-8 border-gray-900"
                break;
                
            case "Assassin":
                color.value = showColors + " anim-color-assassin border-8 border-gray-900"
                break;
        
            default:
                color.value = showColors + " anim-color-red border-8 border-gray-900"
                break;
        }

        const CodenameClick = (event) => {
            let elem = event.target;
            if(elem.tagName == "P"){
                elem = elem.parentNode
            }
            elem.style.animationPlayState = "initial"

            emitter.emit('codenames-click', elem)
        }

        return {
            color,
            CodenameClick,
        };
    }
}
</script>

<style>
.play-animation{
    animation-play-state: initial !important;
}

.anim-color-red {
  animation-name: change-color-red;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-play-state: paused;
  animation-fill-mode: forwards
}

@keyframes change-color-red {
  from {border-color: rgb(31, 41, 55);}
  to {border-color: rgb(220, 38, 38);}
}

.anim-color-blue {
  animation-name: change-color-blue;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-play-state: paused;
  animation-fill-mode: forwards
}

@keyframes change-color-blue {
  from {border-color: rgb(31, 41, 55);}
  to {border-color: rgb(67, 56, 202);}
}

.anim-color-bystander {
  animation-name: change-color-bystander;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-play-state: paused;
  animation-fill-mode: forwards
}

@keyframes change-color-bystander {
  from {border-color: rgb(31, 41, 55);}
  to {border-color: rgb(254, 243, 199);}
}

.anim-color-assassin {
  animation-name: change-color-assassin;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-play-state: paused;
  animation-fill-mode: forwards
}

@keyframes change-color-assassin {
  from {border-color: rgb(31, 41, 55);}
  to {border-color: rgb(17, 24, 39);}
}
</style>