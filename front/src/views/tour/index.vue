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
                        @delete="deleteModal"
                        :data="item"
                        :logged="isLoggedIn"
                    />
                </template>
            </div>
        </div>

        <Modal :active="modal.delete" @close="modal.delete = false">
            <div class="modal delete">
                <h5>Удалить турнир</h5>
                <div class="w-full flex items-center gap-[10px]">
                    <Button @click="deleteItem" class="p-[16px] text-[24px] font-bold">Да</Button>
                    <Button @click="modal.delete = false" class="p-[16px] text-[24px] font-bold dark">Нет</Button>
                </div>
            </div>
        </Modal>

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

        <Modal class="align-none" :active="modal.create" @close="modal.create = false">
            <div class="modal create">
                <h5>Создание турнира</h5>
                <form @submit.prevent="createTour">
                    <div :class="{'open': accordeon.tour}" class="accordeon">
                        <button @click.prevent="toggleAccordion" class="opener">Турнир</button>
                        <div class="content">
                            <div style="min-height: 0">
                                <div class="content-inner">

                                    <label class="required">
                                        <span>Название</span>
                                        <input :class="{'error': formCreate.name.length < 1}" v-model="formCreate.name" type="text" />
                                    </label>
                                    <label class="required">
                                        <span>Дата проведения</span>
                                        <input :class="{'error': formCreate.date.length < 1}" v-model="formCreate.date" type="text" />
                                    </label>
                                    <label class="required">
                                        <span>Ссылка на форму</span>
                                        <input :class="{'error': formCreate.url.length < 1}" v-model="formCreate.url" type="text" />
                                    </label>
                                    <label class="required">
                                        <span>Описание</span>
                                        <textarea :class="{'error': formCreate.description.length < 1}" v-model="formCreate.description"></textarea>
                                    </label>
                                    <label class="required">
                                        <span>Призовых мест</span>
                                        <input v-model="formCreate.price_place" min="1" type="number" />
                                    </label>
                                    <label class="required">
                                        <span>Тип сетки</span>
                                        <select name="grid_type" v-model="formCreate.grid_type">
                                            <option value="normal" selected>Стандартная</option>
                                            <option value="lower">С нижней сеткой</option>
                                        </select>
                                    </label>
                                    <label class="required">
                                        <span>Изображение</span>
                                        <input :class="{'error': !formCreate.image.file}" type="file" @change="onFileChange" accept="image/*" />
                                    </label>
                                    <div v-if="formCreate.image.url" class="preview-image">
                                        <img :src="formCreate.image.url" alt="Preview"/>
                                        <button @click="removeImage">
                                            <svg class="size-[100px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="{'open': accordeon.teams}" class="accordeon">
                        <button @click.prevent="toggleAccordion" class="opener">Участники турнира</button>
                        <div class="content">
                            <div style="min-height: 0">
                                <div class="content-inner">

                                    <label>
                                        <span>Список участников</span>
                                        <p>1 команда = 1 строка</p>
                                        <textarea v-model="formCreate.teams" rows="7"></textarea>
                                    </label>
                                    <label class="checkbox">
                                        <input v-model="formCreate.random" type="checkbox"/>
                                        <span>Случайный посев</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <Button class="p-[16px] text-[24px] font-bold">Создать</Button>
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
    delete: false as boolean,
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
    price_place: 1 as number,
    grid_type: 'normal' as string,

    teams: '' as any,
    random: false as boolean,
}) as any;

const deleteId = ref(null) as any


const accordeon = ref({
    tour: true as boolean,
    teams: false as boolean
})

const toggleAccordion = () => {
    accordeon.value.tour = !accordeon.value.tour
    accordeon.value.teams = !accordeon.value.teams
}

const editItem = (id: number) => {
    currentTour.value = _.filter(tournaments.value, { id: id })[0];
    formEdit.value = { ...currentTour.value };
    modal.value.edit = true;
};
const saveEdit = async () => {
    await adminStorage.saveEditTour(formEdit.value);
    modal.value.edit = false
};



const deleteModal = async (id: number) => {
    deleteId.value = id
    modal.value.delete = true
};
const deleteItem = async () => {
    await adminStorage.deleteTour(deleteId.value);
    modal.value.delete = false
};

const createItem = async () => {
    clearForm()
    modal.value.create = true
    console.log(name);

};


const clearForm = () => {
    removeImage()
    formCreate.value.name = ''
    formCreate.value.date = ''
    formCreate.value.description = ''
    formCreate.value.url = ''
    formCreate.value.price_place = 1
    formCreate.value.grid_type = 'normal'
    formCreate.value.teams = ''
    formCreate.value.random = false
}


const onFileChange = (event: any) => {
    console.log(event);
    
    const file = event.target.files[0];
    
    if (file) {
        formCreate.value.image.file = file;
        formCreate.value.image.url = URL.createObjectURL(file);
    }
}
const removeImage = () => {
    formCreate.value.image.file = null;
    formCreate.value.image.url = null;
}
const createTour = async () => {
    if (formCreate.value.teams) {
        formCreate.value.teams = formCreate.value.teams.split('\n')
    }

    await adminStorage.createTour(formCreate.value)

    clearForm()
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
            

            font-size: 24px;
            p{
                font-size: 18px;
            }
            input,
            textarea,
            select {
                margin-top: 16px;

                border: 1px solid $color-1;
                padding: 16px;
                font-size: 18px;
                outline: none;

                transition: all 0.3s ease;
                &:focus {
                    background: $white;
                }
                &.error{
                    border-color: red;
                }
                
            }
            textarea {
                transition: none;
            }

            &.required{
                span{
                    &::after{
                        content: '*';
                        color: red;
                    }
                }
            }
            &.checkbox{
                cursor: pointer;

                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 16px;
                input{
                    
                    margin: 0;
                    $size: 24px;
                    min-width: $size;
                    max-width: $size;
                    min-height: $size;
                    min-height: $size;
                }
            }
        }
        .preview-image{
            position: relative;
            $size: 350px;
            max-width: $size;
            min-width: $size;
            max-height: $size;
            min-height: $size;
            img{
                max-width: inherit;
                min-width: inherit;
                max-height: inherit;
                min-height: inherit;
                object-fit: cover;
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
    .accordeon{
        &.open{
            .opener{
                &::after{
                    rotate: 180deg;
                }
            }
            .content{
                grid-template-rows: 1fr;
            }
        }
        button{
            font-size: 32px;
            font-weight: 700;
            color: $color-1;

            width: 100%;
            text-align: left;

            margin-bottom: 16px;

            border-bottom: 1px solid $color-1;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            &::after{
                content: '';
                display: block;

                clip-path: path('m4 15l8-8l8 8l-1.414 1.414L12 9.828l-6.586 6.586z');

                width: 24px;
                aspect-ratio: 1;
                background: $color-1;

                transition: all .3s ease;
            }
        }
        .content{
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;

            transition: all .3s ease;
            &-inner{
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
        }
    }
}
</style>
