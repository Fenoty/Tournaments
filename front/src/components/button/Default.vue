<template>
    <template v-if="type === 'Link' && link">
        <a :href="link" class="btn" :to="link">
            <slot/>
        </a>
    </template>
    <template v-else-if="type === 'Router-Link' && link">
        <RouterLink  class="btn" :to="link">
            <slot/>
        </RouterLink>
    </template>
    <template v-else-if="type === 'Btn'">
        <button class="btn">
            <slot/>
        </button>
    </template>
</template>

<script lang="ts" setup>
defineProps({
    type: {
        type: String as () => 'Btn' | 'Link' | 'Router-Link',
        required: false,
        default: 'Btn'
    },
    link: {
        type: String,
        required: false,
    },
});
</script>

<style lang="scss" scoped>
.btn{
    cursor: pointer;

    width: 100%;
    background: $color-1;
    color: $white;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all .3s ease;
    &:hover{
        background: $color-3;
    }
    &.dark{
        background: $color-2;
        &:hover{
            background: $color-4;
        }
    }
}
</style>