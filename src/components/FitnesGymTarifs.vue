<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    tarrifs: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every(item =>
                typeof item.id === 'string' &&
                typeof item.tarrifTitle === 'string' &&
                Array.isArray(item.tarrifOptions) &&
                typeof item.tarrifPrice === 'number' &&
                Array.isArray(item.notes)
            )
        }
    },
})
const hasNote = (item, optionTitle) => {
    return item.notes.some(note => note.title === optionTitle)
}
// Реактивная переменная для хранения текста открытой подсказки.
// По умолчанию она пустая (''), значит, ни одна подсказка не открыта.
const activeTooltip = ref('');

// Функция, которая возвращает описание для конкретного пункта
const getNoteDescription = (item, optionTitle) => {
    const found = item.notes.find(note => note.title === optionTitle);
    return found ? found.description : '';
};
// Создаём уникальный ключ для каждой подсказки
const getTooltipKey = (item, optionTitle) => {
    return `${item.id}-${optionTitle}`;
};

// Функция, которая срабатывает при клике на "!"
const toggleNote = (item, optionTitle) => {
    const key = getTooltipKey(item, optionTitle);


    // Если кликнули по уже открытой подсказке — закрываем её (очищаем переменную)
    if (activeTooltip.value === key) {
        activeTooltip.value = '';
    } else {
        // Иначе открываем новую подсказку
        activeTooltip.value = key;
    }
};

</script>

<template>
    <div class="tarrif-wrapper">
        <h2 class="tarrif-wrapper__title">Тарифы на абонементы зала</h2>
        <div class="tarrif-wrapper-grid">
            <div class="tarrif-wrapper__card" v-for="item in tarrifs" :key="item.id">
                <div class="tarrif-wrapper__card-header">

                    <h3 class="tarrif-wrapper__card-header-title">{{ item.tarrifTitle.toUpperCase() }}</h3>

                    <p class="tarrif-wrapper__card-header-price">{{ item.tarrifPrice }}
                        ₽/<small><span>месяц</span></small></p>
                </div>
                <div class="tarrif-wrapper__card-content">
                    <ul class="tarrif-wrapper__card-content-list">
                        <li v-for="el in item.tarrifOptions">
                            <div class="tarrif-wrapper__card-content-list-li-wrapper">
                                <div class="tarrif-wrapper__card-content-list-li-wrapper-img">
                                    <img width="12px" height="10px" src="/public/vectors/icons8-галочка.svg" alt="">
                                </div>
                                <span class="tarrif-wrapper__card-content-list-li-wrapper-text">{{ el }}</span>
                                <div v-if="hasNote(item, el)" class="tarrif-wrapper__card-content-list-li-wrapper-extra"
                                    @click="toggleNote(item, el)">
                                    <span>!</span>
                                    <div v-if="activeTooltip === getTooltipKey(item, el)" class="tooltip-popup">
                                        {{ getNoteDescription(item, el) }}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <button class="g-button g-button--gym-info">
            <a href="https://www.ddxfitness.ru/tariffs/" target="_blank">
                Узнать подробную информацию об абонементах
            </a>
        </button>
    </div>
</template>

<style>
.tarrif-wrapper {
    max-width: 407px;
    padding: 0 16px;
    margin: 24px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: calc(100vh - 250px);

}

.tarrif-wrapper__title {
    font-family: var(--second-family);
    font-weight: 800;
    font-size: 36px;
    line-height: 120%;
    margin-bottom: 24px;
}

.tarrif-wrapper-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: stretch;
}


.tarrif-wrapper__card {
    display: flex;
    flex-direction: column;
    padding: 20px 8px 8px;
    border-radius: 32px;
    height: 100%;
}

.tarrif-wrapper__card-header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 12px;

    h3,
    p {
        color: var(--white-text);
        font-family: var(--font-family);
        font-weight: 600;
        font-size: 20px;
        line-height: 120%;
    }

    p {
        font-size: 14px;
    }

    span {
        font-size: 13px;
        font-weight: 400;
    }
}

.tarrif-wrapper__card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding: 16px;
    background-color: var(--white-text);
    border-radius: 32px;
}

.tarrif-wrapper__card-content-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
}

.tarrif-wrapper__card-content-list-li-wrapper {
    display: flex;
    justify-content: start;
    gap: 6px;
    align-items: center;
}

.tarrif-wrapper__card-content-list-li-wrapper-img {
    background-color: var(--logo-blue);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.tarrif-wrapper__card-content-list-li-wrapper-text {
    line-height: 27px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
}

.g-button--gym-tarrifs {
    border-radius: 32px;
    margin-top: 12px;
    background-color: var(--logo-blue);
}

.g-button--gym-info {
    display: block;
    width: fit-content;
    margin: 24px auto 0;
    border-radius: 32px;
}

.tarrif-wrapper__card-content-list-li-wrapper-extra {
    background-color: var(--grey-text);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;

    span {
        color: var(--main-background);
    }
}

.tooltip-popup {
    position: absolute;
    top: calc(100% + 8px);
    bottom: 0;
    right: 0;
    width: 200px;
    height: max-content;
    background-color: var(--white-text);
    color: var(--btn-text);
    padding: 10px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.4;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Маленький треугольник сверху (для красоты) */
.tooltip-popup::after {
    content: '';
    position: absolute;

    top: -5px;
    right: 5px;
    /* Выравниваем по правому краю, как и саму подсказку */
    border-width: 5px;
    border-style: solid;
    /* Магия треугольника: чтобы он указывал ВВЕРХ, красим НИЖНЮЮ границу. 
       Цвет должен совпадать с фоном подсказки! */
    border-color: transparent transparent var(--logo-blue) transparent;
}

.tarrif-wrapper__card:nth-child(1) {
    background-color: var(--logo-blue);
}

.tarrif-wrapper__card:nth-child(2) {
    background-color: var(--button-color);

    .tarrif-wrapper__card-content-list-li-wrapper-img {
        background-color: var(--button-color);
    }

    .g-button--gym-tarrifs {
        background-color: var(--button-color);
    }

    .tooltip-popup::after {
        border-color: transparent transparent var(--button-color) transparent;
    }
}

.tarrif-wrapper__card:nth-child(3) {
    background-color: var(--tarrif-card-background-dark);

    .tarrif-wrapper__card-content-list-li-wrapper-img {
        background-color: var(--tarrif-card-background-dark);
    }

    .g-button--gym-tarrifs {
        background-color: var(--tarrif-card-background-dark);
    }

    .tooltip-popup::after {
        border-color: transparent transparent var(--tarrif-card-background-dark) transparent;
    }
}

.tarrif-wrapper__card:nth-child(4) {
    background-color: var(--tarrifs-title-text);

    .tarrif-wrapper__card-content-list-li-wrapper-img {
        background-color: var(--tarrifs-title-text);
    }

    .g-button--gym-tarrifs {
        background-color: var(--tarrifs-title-text);
    }

    .tooltip-popup::after {
        border-color: transparent transparent var(--tarrifs-title-text) transparent;
    }
}


.tarrif-wrapper__card-content-list {
    li {
        list-style-type: none;
    }
}

a {
    text-decoration: none;
    color: var(--white-text);
}

@media (min-width: 768px) {
    .tarrif-wrapper {
        max-width: 832px;
        padding: 0 32px;
    }

    .tarrif-wrapper-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
}

@media (min-width: 1440px) {
    .tarrif-wrapper {
        max-width: 1600px;
        padding: 0 80px;
    }

    .tarrif-wrapper-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
    }
}
</style>