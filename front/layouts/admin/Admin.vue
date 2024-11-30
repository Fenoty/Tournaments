<template>
    <section>
        <HeaderAdmin/>
        <slot/>
    </section>
</template>

<script setup lang="ts">
console.log('loaded');

</script>

<style lang="scss" scoped>
    section{
        height: 100%;
        display: flex;
        flex-direction: row;
    }
</style>