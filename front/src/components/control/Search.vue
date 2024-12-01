<template>
    <form class="search">
        <input @input="searchInput" type="text" placeholder="Найти чтото..." v-model="searchValue">
        <Button @click.prevent="search" class="p-[10px] max-w-[60px]">
            <svg class="size-[20px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"/></svg>
        </Button>
    </form>
</template>

<script lang="ts" setup>
import Button from '@components/button/Default.vue'
import { ref } from 'vue';

const searchValue = ref();
const emit = defineEmits()

const search = () => {
    emit('searchCallback', searchValue.value);
}
const searchInput = () => {
    if (searchValue.value.length === 0) {
        emit('searchCallback', searchValue.value);
    }
}

</script>

<style lang="scss" scoped>
.search{
    width: 100%;
    max-width: 700px;

    border: 1px solid $color-1;

    display: flex;
    flex-direction: row;
    input{
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        color: $black;
        padding: 10px;
        outline: none;
    }
}
</style>
