<script setup>
// Импортируем готовые Vue-компоненты
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Импортируем стили
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Собираем модули в массив
const modules = [Navigation, Pagination, Autoplay];

// Настройки слайдера
const swiperOptions = {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
};
</script>

<template>
    <!-- Передаем модули и настройки в компонент -->
    <Swiper :modules="modules" v-bind="swiperOptions" class="swiper-art-1 g-container">
        <SwiperSlide>
            <img src="/public/photoSlider/photo_2025-08-28_11-35-18.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide>
            <img src="/public/photoSlider/photo_2025-08-30_08-04-08.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="slide-three">
            <img src="/public/photoSlider/photo_2026-06-21_01-10-10.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="slide-four">
            <img src="/public/photoSlider/photo_2026-08-01_21-21-53.jpg" alt="">
        </SwiperSlide>

        <!-- Элементы управления внутри компонента -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </Swiper>

</template>

<style>
/* Важно: задай высоту, иначе слайдер может схлопнуться в 0px */
.swiper-art-1 {
    margin-top: 20px;
    width: 100%;
    height: 320px;
}

/* Для наглядности, чтобы слайды было видно */
.swiper-art-1 {
    --swiper-theme-color: var(--button-color);

}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    /* border: 1px solid #ccc; */
    border-radius: 16px;
}


.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* border-radius: 16px; */
    /* Скругляем углы самой картинки */
    display: block;
    background-color: var(--main-background);
}

@media(min-width:768px) {
    .swiper-art-1 {
        height: 360px;
    }

    .swiper-slide img {
        object-fit: cover;
        object-position: left;
    }
}

@media(min-width:1440px) {
    .swiper-art-1 {
        max-width: 1344px;
        height: 400px;
    }

    .swiper-slide img {
        object-fit: cover;
        object-position: center;
    }

    .slide-three img {
        object-position: center calc(50% + 100px);
    }

    .slide-four img {
        object-position: center calc(50% + 50px);
    }
}
</style>