<script setup>
import { useMediaQuery } from '@vueuse/core';
import DesktopHeader from './DesktopHeader.vue';
import MobileTabletHeader from './MobileTabletHeader.vue';
import { sectionsStorage } from '@/stores/sections.js';
import { useRouter } from 'vue-router'; // Импортируем роутер
const sectionsItems = sectionsStorage(); // Инициализация роутера

const isDesktop = useMediaQuery('(min-width: 1440px)');
const router = useRouter();
// 3. Создаем функцию-обработчик клика
const handleSectionClick = (section) => {
    if (section === 'МОИ УСЛУГИ') {
        router.push('/services'); // Делаем переход на страницу услуг
    }
    else if (section === 'Главная') {
        router.push('/'); 
    }
    else if (section === 'О фитнес-зале') {
        router.push('/gym'); 
    }
    else {
        // Для остальных секций оставляю пока текущую логику
        sectionsItems.changeSection(section);
    }
};

</script>

<template>
    <MobileTabletHeader class="mob-tab-desktop" v-if="!isDesktop" @selectSection="handleSectionClick" />
    <DesktopHeader class="header-desktop" v-if="isDesktop" :current-section="sectionsItems.currentSection"
        :sections="sectionsItems.sectionsArr" :promo="sectionsItems.promoSection" @selectSection="handleSectionClick" />
</template>

<style></style>