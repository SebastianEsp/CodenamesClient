<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-center h-16 text-purple-600 space-x-5">
                <router-link :to="{name: 'Home'}">Home</router-link>
                <router-link :to="{name: 'About'}">About</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style>

</style>