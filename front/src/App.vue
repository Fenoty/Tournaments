<template>
    <Header/>
    <main class="h-full">
        <RouterView v-slot="{Component}">
            <transition name="fade" mode="out-in" appear>
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

import { onMounted } from 'vue';
import { adminStore } from '@stores/admin';

const adminStorage = adminStore()
adminStorage.checkAuth();

</script>



<style lang="scss">

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
