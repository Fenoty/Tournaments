<template>
    <header>
        <div class="container">
            <div class="header">
                <NuxtLink to="/" class="name">Tournaments</NuxtLink>
                <nav>
                    <ul>
                        <li><NuxtLink :class="{'router-link-active': isActive('/') || isActive('/tour')}" to="/tour">Турниры</NuxtLink></li>
                        <li><NuxtLink to="/contacts">Контакты</NuxtLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
const route = useRoute();


const isActive = (path: any) => {
  return route.path === path || route.path.startsWith(path + '/');
};
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    background-color: $color-3;
    position: sticky;
    top: 0;
    left: 0;
    .header{
        padding: 20px 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 50px;
        .name{
            font-size: 50px;
            font-weight: 700;
            text-transform: uppercase;
            color: $color-4;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        nav{
            ul{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 20px;
                li{
                    a{
                        font-size: 24px;
                        font-weight: 600;
    
                        color: $color-5;
                        transition: all .3s ease;
                        border-bottom: 1px solid transparent;
                        &.router-link-active{
                            color: #fff;
                            border-bottom: 1px solid #fff;
                            padding-bottom: 1px;
                        }
                    }
                }
            }
        }
    }
}
</style>
