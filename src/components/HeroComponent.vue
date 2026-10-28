<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Slider from './Slider.vue';
import ModalWindow from './ModalWindow.vue';
// Реактивная переменная для состояния кнопки
const isButtonGold = ref(false);
let intervalId = null;
let openModal = ref(false);

onMounted(() => {//запуск таймера, при создании компонента
    // Запускаем интервал каждые 5 секунд
    intervalId = setInterval(() => {//включение
        isButtonGold.value = true; // Включаем золотой цвет и анимацию

        // Выключаем через 2 секунды, чтобы кнопка "успокоилась" до следующего интервала
        setTimeout(() => {//выключение
            isButtonGold.value = false;
        }, 2000);
    }, 5000);
});

// Хорошая практика: очищать интервал при удалении компонента, чтобы не было утечек памяти
onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<template>
    <div class="g-container">
        <Slider />
        <section class="hero-section">
            <h1 class="hero-section__title">Георгий Дзгоев - <span>фитнес-тренер</span></h1>
            <h2 class="hero-section__slogan">Ваш путь к лучшей форме</h2>
            <p class="hero-section__description">Сертифицированный тренер. <br>Проверенные методики. Реальные
                результаты.
                <br>Получите индивидуальную программу тренировок и питания под ваши цели.
            </p>
            <p class="hero-section__gym">Фитнес клуб - <span>D1 FITNESS</span></p>
            <a href="https://yandex.ru/maps/-/CXQDRKlF" target="_blank" class="hero-section__location">м. Полежаевская /
                Хорошёвская /
                Народное Ополчение</a>

            <button class="g-button g-button--hero" :class="{ 'g-button--hero-gold': isButtonGold }"
                @click="openModal = true">Записаться
                на бесплатную тренировку</button>
        </section>
        <ModalWindow v-if="openModal" @close="openModal = false" />
    </div>
</template>

<style>
.hero-section {
    margin-top: 24px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.hero-section__title {
    font-family: var(--second-family);
    font-weight: 800;
    font-size: 36px;
    line-height: 120%;
    color: var(--text);

    span {
        white-space: nowrap;
        color: var(--button-color);
    }
}

.hero-section__slogan {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
    color: var(--text);
}

.hero-section__description {
    margin-top: 12px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: var(--text);
}

.hero-section__gym {
    margin-top: 24px;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 14px;
    color: var(--button-color);

    span {
        color: var(--text);
    }
}

.hero-section__location {
    all: unset;
    margin-top: 4px;
    font-family: var(--font-family);
    font-weight: 400;
    line-height: 150%;
    font-size: 13px;
    cursor: pointer;
    text-decoration-line: underline;
    text-decoration-color: var(--button-color);
    text-decoration-style: dashed;
    text-decoration-thickness: 3px;
    text-underline-offset: 5px;
}

.g-button--hero {
    margin-top: 12px;
    align-self: center;
    width: 100%;
    max-width: 768px;
    transition: background-color 0.3s ease;
    /* Плавный переход цвета */
}

.g-button--hero-gold {
    background-color: var(--logo-blue);
    color: var(--btn-text);
    animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-1px) rotate(-1deg);
    }

    40% {
        transform: translateX(1px) rotate(1deg);
    }

    60% {
        transform: translateX(-1px) rotate(-1deg);
    }

    80% {
        transform: translateX(1px) rotate(1deg);
    }
}

@media(min-width:768px) {
    /* .hero-section {
        padding: 0 32px;
    } */

    .hero-section__title {
        font-size: 36px;
    }

    .hero-section__slogan {
        font-size: 24px;
    }

    .hero-section__description {
        font-size: 18px;
    }

    .hero-section__gym {
        font-size: 16px;
    }

    .hero-section__location {
        font-size: 15px;
    }

    .g-button--hero {
        align-self: flex-start;
        margin-top: 24px;
        font-size: 20px;
    }
}

@media(min-width:1440px) {
    /* .hero-section {
        padding: 0 80px;
    } */

    .hero-section__title {
        font-size: 54px;
    }

    .hero-section__slogan {
        font-size: 42px;
    }

    .hero-section__description {
        font-size: 20px;
    }

    .hero-section__gym {
        font-size: 18px;
    }

    .hero-section__location {
        font-size: 16px;
    }
}
</style>