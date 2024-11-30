<template>
    <form class="search">
        <input @input="search" type="text" placeholder="Найти чтото..." v-model="searchValue">
        <ButtonDefault @click.prevent="search" class="p-[10px] max-w-[50px]"><Icon name="uil:search" class="bg-white size-[20px]"/></ButtonDefault>
    </form>
</template>

<script lang="ts" setup>
const searchValue = ref();
const emit = defineEmits()

const search = () => {
    emit('searchCallback', searchValue.value);
}

</script>

<style lang="scss">
.search{
    width: 100%;
    max-width: 700px;

    border: 1px solid $color-1;

    display: flex;
    flex-direction: row;
    height: 100%;
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
