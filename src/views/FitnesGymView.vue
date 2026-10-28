<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import FitnesGymTarifs from '@/components/FitnesGymTarifs.vue';
</script>

<template>
    <div class="fitness-gym-page">
        <TheHeader />
        <main class="fitness-gym-page__main">
            <FitnesGymTarifs :tarrifs="[
                {
                    id: '1',
                    tarrifTitle: 'LIGHT',
                    tarrifOptions: ['Безлимитный доступ в клуб', 'Анализ состава тела InBody', 'Smart Start тренировки', 'Вводная тренировка с тренером'],
                    tarrifPrice: 1900,
                    notes: [
                        {
                            title: 'Smart Start тренировки',
                            description: 'Занятия с тренером в мини-группах в тренажерном зале: 28 направлений по 30 минут. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        }
                    ],
                },
                {
                    id: '2',
                    tarrifTitle: 'SMART',
                    tarrifOptions: ['Безлимитный доступ в клуб', 'Анализ состава тела InBody', 'Smart Start тренировки', 'Вводная тренировка с тренером', '50+ групповых тренировок'],
                    tarrifPrice: 2400,
                    notes: [
                        {
                            title: 'Smart Start тренировки',
                            description: 'Занятия с тренером в мини-группах в тренажерном зале: 28 направлений по 30 минут. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        }
                    ],
                },
                {
                    id: '3',
                    tarrifTitle: 'Infinity',
                    tarrifOptions: ['Безлимитный доступ во все клубы', 'Анализ состава тела InBody', 'Smart Start тренировки', 'Вводная тренировка с тренером', '50+ групповых тренировок', 'Гостевой доступ для друзей', 'Семейный доступ', 'СПА зона'],
                    tarrifPrice: 2800,
                    notes: [
                        {
                            title: 'Smart Start тренировки',
                            description: 'Занятия с тренером в мини-группах в тренажерном зале: 28 направлений по 30 минут. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        },
                        {
                            title: 'Гостевой доступ для друзей',
                            description: 'Бесплатный вход в клуб для твоих друзей (каждый друг может бесплатно пройти в клуб один раз в год). Имеются ограничения. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        },
                        {
                            title: 'Семейный доступ',
                            description: 'Безлимитный вход в клуб для твоей семьи: родители, жена/муж и дети с 16 лет. Имеются ограничения. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        },
                        {
                            title: 'СПА зона',
                            description: 'Финская сауна, турецкий хаммам. Подробную информацию можете уточнить на сайте DDX Fitness или у меня)'
                        },
                    ],
                },
                {
                    id: '4',
                    tarrifTitle: 'Infinity Plus',
                    tarrifOptions: ['Все возможности тарифа Infinity', 'Расширенный функционал анализа состава тела Inbody', 'Видеотренировки для дома и зала DDX Action', 'Дневник тренировок'],
                    tarrifPrice: 3500,
                    notes: [
                        {
                            title: 'Расширенный функционал анализа состава тела Inbody',
                            description: 'Получите детальный отчет и контроль прогресса в приложении.'
                        },
                        {
                            title: 'Дневник тренировок',
                            description: 'Создавайте свои тренировки или добавляйте готовые, планируйте свой тренировочный процесс, фиксируйте результыта и получаейте детальную статистику.'
                        },
                    ]
                },
            ]" />
        </main>
        <TheFooter />
    </div>

</template>

<style>
.fitness-gym-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
}
.fitness-gym-page__main{
    flex: 1;
}
</style>