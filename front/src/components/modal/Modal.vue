<template>
    <transition name="fade" mode="out-in">
        <div v-if="active" class="layout">
            <div class="layout-modal">
                <Button @click="$emit('close')" class="max-w-fit absolute top-[10px] right-[10px]">
                    <svg class="size-[40px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                </Button>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import Button from '@components/button/Default.vue'

defineProps({
    active: {
        type: Boolean,
        required: true,
    },
});

</script>

<style scoped lang="scss">
.layout{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
    &-modal{
        position: relative;
        background: $white;

        width: 100%;
        max-width: 800px;
        padding: 50px 32px 32px 32px;
    }
}
</style>
