import { defineStore } from 'pinia'

export const benefitsStorage = defineStore('benefits', () => {
    const benefitsArr = [
        {
            image: 'public/vectors/icon-wrap.svg',
            title: 'Индивидуальный подход',
            description: 'Тренировки, разработанные с учётом ваших целей и уровня подготовки.',
            btnText: 'Подробнее',
        },
        {
            image: 'public/vectors/icon-wrap (1).svg',
            title: 'Отслеживание прогресса',
            description: 'Метрики прогресса для видимых результатов.',
            btnText: 'Подробнее',
        },
        {
            image: 'public/vectors/icon-wrap (2).svg',
            title: 'Гибкое расписание',
            description: 'Занимайтесь в удобное для себя время',
            btnText: 'Подробнее',
        },
    ];

    return {benefitsArr};
})
