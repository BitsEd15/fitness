<script setup>
import { ref } from 'vue';
import BurgerMenu from './BurgerMenu.vue';
import { sectionsStorage } from '@/stores/sections.js';
import ModalWindow from './ModalWindow.vue';
const sectionsItems = sectionsStorage();
let modalIsOpen = ref(false);
</script>

<template>
    <div class="g-header-container">
        <div class="mob-tab-header">
            <div class="mob-tab-header__logo-container">
                <img src="/public/vectors/logo-icon.svg" alt="logo">
                <h1>
                    FIT
                    <span>PRO</span>
                </h1>
            </div>
            <div class="mob-tab-header__burger-container">
                <button class="g-button mob-tab-header__btn-tablet" @click="modalIsOpen=true">Бесплатная тренировка</button>
                <BurgerMenu :sections="sectionsItems.sectionsArr" :currentSection="sectionsItems.currentSection"
                    :btnText="sectionsItems.burgerMenuBtn" @selectSection="sectionsItems.changeSection"
                    :promo="sectionsItems.promoSection" />
            </div>
            <BurgerMenu id="burger-img-phone" :sections="sectionsItems.sectionsArr"
                :currentSection="sectionsItems.currentSection" :btnText="sectionsItems.burgerMenuBtn"
                @selectSection="sectionsItems.changeSection" :promo="sectionsItems.promoSection" @openModal="modalIsOpen=true"/>
        </div>
        <ModalWindow v-if="modalIsOpen" @close="modalIsOpen = false" />
    </div>

</template>

<style>
/* СМАРТФОН */
.g-header-container {
    width: 100%;
    background-color: var(--header-background);
}

.mob-tab-header {
    max-width: 407px;
    padding: 21px 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-background);
}

.mob-tab-header__logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 107px;
    gap: 6px;

    img {
        width: 27px;
        height: 30px;
    }

    h1 {
        font-family: var(--second-family);
        font-weight: 800;
        font-size: 20px;
        color: var(--white-text);

        span {
            color: var(--button-color)
        }
    }
}

.mob-tab-header__burger-container {
    display: none;
}

.mob-tab-header__burger-menu {
    cursor: pointer;
    transition: 0.2s all ease;
}

.mob-tab-header__burger-menu:hover {
    scale: 1.03;
}

/* ПЛАНШЕТ */
@media (min-width: 768px) {
    .mob-tab-header {
        max-width: 832px;
        padding: 21px 32px;
    }

    .mob-tab-header__logo-container {
        max-width: 118px;

        img {
            width: 30px;
            height: 33px;
        }

        h1 {
            font-size: 22px;
        }
    }

    .mob-tab-header__burger-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;

        .mob-tab-header__btn-tablet.g-button {
            border-radius: 6px;
            padding: 8px 16px;
            max-width: 178px;
            background-color: var(--button-color);
            font-family: var(--font-family);
            font-weight: 700;
            font-size: 12px;
            white-space: nowrap;
            cursor: pointer;
            border: none;
            transition: 0.2s all ease;
        }

    }

    .mob-tab-header__btn-tablet:hover.g-button:hover {
        background-color: #f28c33;
    }

    #burger-img-phone {
        display: none;
    }
}
</style>