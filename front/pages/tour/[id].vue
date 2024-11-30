<template>
    <div class="container">
        <div class="tournament">
            tour - {{ route.params.id }}
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(route.params.id);


</script>

<style lang="scss" scoped>
.tournaments{
    margin-top: 60px;

    display: flex;
    flex-direction: column;
    gap: 40px;
    &-list{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
        
    }
}
</style>
