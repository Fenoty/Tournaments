<template>
    <Header/>
    <main>
        <RouterView v-slot="{Component}">
            <transition name="fade-general" mode="out-in" appear>
                <KeepAlive>
                    <component :is="Component"></component>
                </KeepAlive>
            </transition>
        </RouterView>
    </main>

    

</template>

<script setup lang="ts">
import Header from '@components/header/Default.vue'
import { RouterView } from 'vue-router';

</script>



<style lang="scss">

.fade-general-enter-active,
.fade-general-leave-active {
    transition: all 0.3s ease;
}

.fade-general-enter-from,
.fade-general-leave-to {
    opacity: 0;
}
.fade-general-enter-to,
.fade-general-leave-from {
    opacity: 1;
}
</style>
