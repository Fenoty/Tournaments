<template>
    <aside>
        <div class="content" :style="{ width: `${sidebar.size}px` }">
            <div class="top">
                <div class="logo">
                    <img src="@/assets/images/logo/Follow.svg" alt="">
                </div>
                <ul>
                    <li>
                        <Icon name="streamline:magnifying-glass" size="30"/>
                        <span>Поиск</span>
                    </li>
                    <li>
                        <Icon name="streamline:bag-suitcase-1" size="30"/>
                        <span>Проекты</span>
                    </li>
                    <li>
                        <Icon name="streamline:bullet-list-solid" size="30"/>
                        <span>Задачи</span>
                    </li>
                </ul>
            </div>
            <div class="delimiter"></div>
            <!-- <Icon name="line-md:close" size="30" class="text-white" /> -->
        </div>
        <div @mousedown="startDragHandle" @mousemove="arrowHandle" class="divider">
            <div class="divider-arrow" :class="{ draggable: sidebar.dragabble }" :style="{top: `${sidebar.arrowY}px`}"></div>
        </div>
    </aside>
</template>

<script setup lang="ts">
const sidebar = ref({
    size: 200,
    max: 500,
    min: 50,
    dragabble: false,
    arrowY: 0,
});



const startDragHandle = () => {
    sidebar.value.dragabble = true;
    window.addEventListener("mousemove", mouseMoveHandle, false);
    window.addEventListener("mouseup", endDragging, false);
};
const mouseMoveHandle = (e: any) => {
    const { max, min } = sidebar.value;

    var x = e.clientX - 33;
    sidebar.value.size = x > max ? max : x < min ? min : x;
};
const endDragging = () => {
    sidebar.value.dragabble = false;
    window.removeEventListener("mousemove", mouseMoveHandle);
    window.removeEventListener("mouseup", endDragging, false);
};
const arrowHandle = (e: any) => {
    sidebar.value.arrowY = e.clientY - 15;
};
</script>

<style lang="scss">
//aside {
//    position: relative;
//    display: flex;
//
//    overflow: hidden;
//    
//    .content {
//        width: 200px;
//        overflow: hidden;
//        padding: 16px;
//        box-sizing: content-box;
//        background: $bgPrimary;
//        .top{
//            display: flex;
//            flex-direction: column;
//            gap: 32px;
//            .logo{
//                max-width: 70px;
//            }
//            ul{
//                li{
//                    padding: 15px 0;
//                    display: flex;
//                    align-items: center;
//                    gap: 16px;
//
//                    border-bottom: 1px solid;
//                    border-color: transparent;
//                    transition: all .3s ease;
//                    cursor: pointer;
//                    &:hover{
//                        border-color: $bgAccent; 
//                        gap: 32px;
//                    }
//                    span{
//                        font-size: 24px;
//                        font-weight: 400;
//                        color: $colorPrimary;
//                    }
//                }
//            }
//        }
//    }
//    .divider {
//        position: relative;
//
//        display: flex;
//        align-items: flex-end;
//        justify-content: flex-end;
//        width: 15px;
//        transition: all 0.3s ease;
//        cursor: e-resize;
//
//        background: $bgPrimary;
//        &:hover{
//            background: $bgAccent;
//            .divider-arrow{
//                opacity: 1;
//                visibility: visible;
//            }
//        }
//        &-arrow{
//            position: absolute;
//
//            width: 100%;
//            height: 30px;
//            background: $bgPrimary;
//            display: flex;
//            justify-content: center;
//            align-items: center;
//            gap: 2px;
//
//
//            opacity: 0;
//            visibility: hidden;
//            transition: 
//                opacity .3s ease,
//                visibility .3s ease;
//            &::before, &::after{
//                content: '';
//                display: block;
//                width: 2px;
//                height: 8px;
//                background: #fff;
//            }
//        }
//    }
//}
</style>
