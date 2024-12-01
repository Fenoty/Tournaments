<template>
    <div class="container">
        <div class="tournaments">
            <div class="tournaments-control">
                <Search @searchCallback="searchTour" />
                <Button
                    v-if="isLoggedIn"
                    @click="createItem"
                    class="max-w-fit px-[20px] py-[10px] text-[24px]"
                >
                    Создать
                </Button>
            </div>
            <div class="tournaments-list">
                <template v-for="item in tournaments" :key="item.id">
                    <CardTournament
                        @edit="editItem"
                        @delete="deleteItem"
                        :data="item"
                        :logged="isLoggedIn"
                    />
                </template>
            </div>
        </div>

        <Modal :active="modal.edit" @close="modal.edit = false">
            <div class="modal edit">
                <h5>Редактирование турнира</h5>
                <form @submit.prevent="saveEdit">
                    <label>
                        Название
                        <input v-model="formEdit.name" type="text" />
                    </label>
                    <label>
                        Дата проведения
                        <input v-model="formEdit.date" type="text" />
                    </label>
                    <label>
                        Ссылка на форму
                        <input v-model="formEdit.url" type="text" />
                    </label>
                    <label>
                        Описание
                        <textarea v-model="formEdit.description"></textarea>
                    </label>
                    <Button class="p-[16px] text-[24px] font-bold"
                        >Сохранить</Button
                    >
                </form>
            </div>
        </Modal>

        <Modal :active="modal.create" @close="modal.create = false">
            <div class="modal create">
                <h5>Создание турнира</h5>
                <form @submit.prevent="createTour">
                    <label>
                        Название
                        <input v-model="formCreate.name" type="text" />
                    </label>
                    <label>
                        Дата проведения
                        <input v-model="formCreate.date" type="text" />
                    </label>
                    <label>
                        Ссылка на форму
                        <input v-model="formCreate.url" type="text" />
                    </label>
                    <label>
                        Описание
                        <textarea v-model="formCreate.description"></textarea>
                    </label>
                    <label>
                        Призовых мест
                        <input v-model="formCreate.price_place" type="text" />
                    </label>
                    <label>
                        Тип сетки
                        <select name="grid_type" v-model="formCreate.grid_type">
                            <option value="normal" selected>Стандартная</option>
                            <option value="lower">С нижней сеткой</option>
                        </select>
                    </label>
                    <label>
                        Изображение
                        <input type="file" @change="onFileChange" accept="image/*" />
                    </label>
                    <div v-if="formCreate.image.url" class="preview-image">
                        <img :src="formCreate.image.url" alt="Preview"/>
                        <button @click="removeImage">
                            <svg class="size-[100px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                        </button>
                    </div>
                    
                    
                    <Button class="p-[16px] text-[24px] font-bold">Сохранить</Button>
                </form>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Search from "@components/control/Search.vue";
import CardTournament from "@components/card/Tournament.vue";
import Button from "@components/button/Default.vue";
import Modal from "@components/modal/Modal.vue";

import _ from "lodash";
import { onMounted, ref, computed } from "vue";

import { tourStore } from "@stores/tours";
import { adminStore } from "@stores/admin";

const adminStorage = adminStore();
const isLoggedIn = computed(() => adminStorage.isLoggedIn);

const modal = ref({
    edit: false as boolean,
    create: false as boolean,
});
const currentTour = ref({}) as any;
const formEdit = ref({}) as any;
const formCreate = ref({
    name: '' as string,
    date: '' as string,
    image: {} as any,
    description: '' as string,
    url: '' as string,
    price_place: '' as string,
    grid_type: '' as string
}) as any;

const editItem = (id: number) => {
    currentTour.value = _.filter(tournaments.value, { id: id })[0];
    formEdit.value = { ...currentTour.value };
    modal.value.edit = true;
};
const saveEdit = async () => {
    await adminStorage.saveEditTour(formEdit.value);
};

const deleteItem = async (id: number) => {
    await adminStorage.deleteTour(id);
};


const createItem = () => {
    modal.value.create = true;
};



const onFileChange = (event: any) => {
    console.log(event);
    
    const file = event.target.files[0];
    
    if (file) {
        formCreate.value.image.file = file;
        formCreate.value.image.url = URL.createObjectURL(file);
    }
}
const removeImage = () => {
    formCreate.value.image = null;
}
const createTour = async () => {
    await adminStorage.createTour(formCreate.value)
}




const tourStorage = tourStore();
const tournaments = computed(() => tourStorage.getFilteredTours);

const searchTour = (value: string) => {
    tourStorage.searchValue = value;
};

onMounted(async () => {
    await tourStorage.getAllTour();
});
</script>

<style lang="scss" scoped>
.tournaments {
    padding: 60px 0;

    display: flex;
    flex-direction: column;
    gap: 40px;
    &-control {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    &-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 400px));
        gap: 20px;
    }
}

.modal {
    display: flex;
    flex-direction: column;
    gap: 40px;
    h5 {
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        color: $color-2;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        label {
            display: flex;
            flex-direction: column;
            gap: 8px;

            font-size: 24px;
            input,
            textarea,
            select {
                border: 1px solid $color-1;
                padding: 16px;
                font-size: 18px;
                outline: none;

                transition: all 0.3s ease;
                &:focus {
                    background: $white;
                }
            }
            textarea {
                transition: none;
            }
        }
        .preview-image{
            position: relative;
            $size: 300px;
            max-width: $size;
            min-width: $size;
            max-height: $size;
            min-height: $size;
            img{
                max-width: inherit;
                min-width: inherit;
                max-height: inherit;
                min-height: inherit;
            }
            &:hover{
                button{
                    opacity: 1;
                }
            }
            button{
                background: rgba(169, 217, 208, 0.5);

                display: flex;
                align-items: center;
                justify-content: center;

                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;

                opacity: 0;
                transition: all .3s ease;

                color: $white;

            }
        }
    }
}
</style>
