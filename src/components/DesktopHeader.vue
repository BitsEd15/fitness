<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import ModalWindow from './ModalWindow.vue';
const props = defineProps({
    currentSection: {
        type: String
    },
    sections: {
        type: Array
    },
    promo: {
        type: String
    },
});
const emit = defineEmits(['selectSection']);

let modalIsOpen = ref(false);
</script>

<template>
    <div class="g-header-container">
        <div class="desktop-header">
            <div class="desktop-header__logo-container">
                <img src="/public/vectors/logo-icon.svg" alt="logo">
                <h1>
                    FIT
                    <span>PRO</span>
                </h1>
            </div>
            <div class="desktop-header__nav-container">
                <div class="desktop-header__nav-container-section" v-for="section in sections" :key="section" :class="{
                    'desktop-header__nav-container-section-selected': section === currentSection,
                    'desktop-header__nav-container-section-promo': section === promo
                }" @click="emit('selectSection', section)">
                    {{ section }}
                </div>
                <button class="g-button desktop-header__btn-tablet" @click="modalIsOpen = true">Бесплатная
                    тренировка</button>
            </div>
        </div>
        <ModalWindow v-if="modalIsOpen" @close="modalIsOpen = false" />
    </div>

</template>

<style>
.desktop-header {
    max-width: 1600px;
    padding: 24px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-background);
}

.desktop-header__logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 127px;
    gap: 6px;

    img {
        width: 32px;
        height: 35px;
    }

    h1 {
        font-family: var(--second-family);
        font-weight: 800;
        font-size: 24px;
        color: var(--white-text);

        span {
            color: var(--button-color)
        }
    }
}

.desktop-header__nav-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
}

.desktop-header__nav-container-section {
    cursor: pointer;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    color: var(--grey-text);
}

.desktop-header__nav-container-section-selected {
    border-radius: 8px;
    padding: 5px 10px;
    background-color: var(--section-selected-backfground);
    color: var(--white-text);
}

.desktop-header__btn-tablet.g-button {
    border-radius: 8px;
    padding: 10px 20px;
    background-color: var(--button-color);
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    transition: 0.2s all ease;
}

.desktop-header__btn-tablet:hover.g-button:hover {
    background-color: #f28c33;
}

.desktop-header__nav-container-section-promo {
    border-radius: 8px;
    padding: 5px 10px;
    background-color: rgba(234, 109, 45, 0.05);
    border: 1px solid rgba(234, 109, 45, 0.3);
    box-shadow: 0 0 12px rgba(234, 109, 45, 0.1);
    transition: all 0.3s ease;
    color: var(--button-color);
    font-weight: 700;
}

.desktop-header__nav-container-section-promo:hover {
    background-color: rgba(234, 109, 45, 0.1);
    border-color: var(--button-color);
    box-shadow: 0 0 20px rgba(234, 109, 45, 0.25);
    color: var(--white-text);
}

.desktop-header__nav-container-section-selected.desktop-header__nav-container-section-promo {
    color: var(--white-text);
}

.desktop-header__nav-container-section:hover {
    color: var(--white-text);
}
</style>