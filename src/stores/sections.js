import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const sectionsStorage = defineStore('sections', () => {
    //выбор секции сайта
    const sectionsArr = ["Главная", "МОИ УСЛУГИ", "Статьи", "Видео", "Упражнения", "Контакты", "Дипломы и Сертификаты"];
    const currentSection = ref('Главная');
    const promoSection = 'МОИ УСЛУГИ';
    const burgerMenuBtn='Записаться на бесплатную тренировку'
    const changeSection = (section)=>{
        currentSection.value=section;
    }

    return { sectionsArr, currentSection,burgerMenuBtn, changeSection, promoSection}
})
