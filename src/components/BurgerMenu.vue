<script setup>
import { ref, defineProps, defineEmits } from 'vue';



const isShow = ref(false);
const props = defineProps({
    currentSection: {
        type: String
    },
    sections: {
        type: Array
    },
    btnText: {
        type: String
    },
    promo: {
        type: String
    },
});
const emit = defineEmits(['selectSection', 'openModal']);
// Функция, которая срабатывает при клике на секцию
const handleSelect = (section) => {
    emit('selectSection', section);// 1. Передаем выбранную секцию в Header (а оттуда в Pinia)
    isShow.value = false;           // 2. Сразу закрываем меню после выбора
};
</script>

<template>
    <div class="burger-menu">
        <div class="burger-menu__images-container">
            <img id="menu-open" src="/public/vectors/menu.svg" alt="Открыть меню" v-if="!isShow" @click="isShow = true">
            <img id="menu-close" src="/public/vectors/close-button.svg" alt="Закрыть меню" v-if="isShow"
                @click="isShow = false">
        </div>
        <div class="burger-menu__sections-container" v-if="isShow">
            <!-- Внутренняя обертка для центрирования контента, как в хедере -->
            <div class="burger-menu__content">
                <div class="burger-menu__sections-container-text-wrapper" v-for="section in sections" :key="section"
                    :class="{
                        'section--selected': section === currentSection,
                        'section--promo': section === promo
                    }" @click="handleSelect(section)">
                    <p class="burger-menu__sections-container-text">{{ section }}</p>
                    <div class="section--selected--dot" v-if="section === currentSection"></div>
                </div>

                <button class="burger-menu__btn" @click="emit('openModal')">{{ btnText }}</button>
            </div>
        </div>
    </div>
</template>

<style>
/* СМАРТФОН И ПЛАНШЕТ */

#menu-close,
#menu-open {
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 101;
    /* Кнопка закрытия должна быть поверх самого меню */
    position: relative;
}

.burger-menu__sections-container {
    margin-top: 21px;
    padding-bottom: 21px;
    position: fixed;
    top: 72px;
    /* Отступ сверху = высота хедера */
    left: 0;
    z-index: 100;

    /* Главная фишка: используем calc, чтобы меню занимало ТОЛЬКО оставшуюся часть экрана */
    width: 100%;
    height: calc(100dvh - 72px);
    /* dvh - динамическая высота viewport (лучше для мобильных) */
    height: calc(100vh - 72px);
    /* fallback для старых браузеров, если dvh не поддерживается */

    background-color: var(--main-background);
    display: flex;
    justify-content: center;
    /* Центрируем внутренний контент */
    transition: all 0.3s ease;
}

/* Внутренняя обертка: ограничивает ширину и задает отступы, как в хедере */
.burger-menu__content {
    width: 100%;
    max-width: 407px;
    padding: 21px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 100%;
}

.burger-menu__sections-container-text-wrapper {
    width: 100%;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease-in-out;

    .burger-menu__sections-container-text {
        font-family: var(--font-family);
        font-weight: 600;
        font-size: 16px;
    }

    cursor: pointer;
}

.section--selected {
    border-radius: 8px;
    padding: 16px 8px;
    width: 100%;
    background-color: var(--section-selected-backfground);
}

.section--selected--dot {
    border-radius: 3px;
    width: 6px;
    height: 6px;
    background-color: var(--button-color);
}

.burger-menu__btn {
    border-radius: 12px;
    padding: 16px;
    width: 100%;
    cursor: pointer;
    border: none;
    background-color: var(--button-color);
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    transition: all 0.2s ease-in-out;
}

.burger-menu__btn:hover {
    opacity: 0.9;
}

.section--promo {
    border-radius: 8px;
    padding: 16px 8px;
    width: 100%;
    background-color: rgba(234, 109, 45, 0.05);
    border: 1px solid rgba(234, 109, 45, 0.3);
    box-shadow: 0 0 12px rgba(234, 109, 45, 0.1);
    transition: all 0.3s ease;
    color: var(--button-color);
    font-weight: 700;
}

.section--promo.section--selected {
    color: var(--white-text);
}

.section--promo:hover {
    background-color: rgba(234, 109, 45, 0.1);
    border-color: var(--button-color);
    /* Рамка становится полностью оранжевой */
    box-shadow: 0 0 20px rgba(234, 109, 45, 0.25);
    /* Свечение усиливается */
}



@media (min-width: 768px) {
    .burger-menu__content {
        max-width: 832px;
        padding: 21px 32px;
    }

    .burger-menu__sections-container {
        top: 76px;
    }

    .burger-menu__sections-container-text-wrapper:hover {
        border-radius: 8px;
        padding: 16px 8px;
        width: 100%;
        background-color: var(--section-selected-backfground);
        cursor: pointer;
    }

    .section--promo:hover {
        background-color: rgba(234, 109, 45, 0.1);
        border-color: var(--button-color);
        box-shadow: 0 0 20px rgba(234, 109, 45, 0.25);
        transform: translateX(4px);
    }
}
</style>