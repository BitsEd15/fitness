<script setup>
import { useMediaQuery } from '@vueuse/core';
import DesktopHeader from './DesktopHeader.vue';
import MobileTabletHeader from './MobileTabletHeader.vue';
import { sectionsStorage } from '@/stores/sections.js';
const sectionsItems = sectionsStorage();

const isDesktop = useMediaQuery('(min-width: 1440px)');

</script>

<template>
    <MobileTabletHeader class="mob-tab-desktop" v-if="!isDesktop" />
    <DesktopHeader class="header-desktop" v-if="isDesktop" 
    :current-section="sectionsItems.currentSection" 
    :sections="sectionsItems.sectionsArr" 
    :promo="sectionsItems.promoSection"
    @selectSection="sectionsItems.changeSection"/>
</template>

<style></style>