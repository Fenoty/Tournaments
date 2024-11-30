<template>
    <NuxtLayout :name="layout">
        <NuxtPage/>
    </NuxtLayout>
</template>


<script setup lang="ts">
const layout = 'user' as 'user' | 'admin';
console.log(layout);

</script>

<style lang="scss">
@use "@/assets/styles/_base.scss";

</style>
