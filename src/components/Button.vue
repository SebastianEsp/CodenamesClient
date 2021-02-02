<template>
    <div class="flex flex-col">
        <div class="flex justify-center">
            <router-link :to=href class="flex m-5 bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                {{ text }}
                <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-2 w-6 stroke-current text-white stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: String,
        href: String
    }
}
</script>