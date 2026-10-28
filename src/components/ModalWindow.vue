<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['close']);

</script>

<template>
    <div class="modal-wrapper" @click.self="emit('close')">
        <div class="modal">
            <button type="button" class="close-btn" aria-label="Закрыть" @click.self="emit('close')">×</button>
            <h1 class="modal__title">Заполните форму и я свяжусь с Вами 🚀🏋️‍♂️💪</h1>
            <form class="modal__form" @submit.prevent>
                <label class="modal__form-labels" for="name">ИМЯ</label>
                <input class="modal__form-inputs" type="text" id="name" name="name" placeholder="Введите имя">
                <label class="modal__form-labels" for="phone">ТЕЛЕФОН</label>
                <input class="modal__form-inputs" type="text" id="phone" name="phone" placeholder="Введите телефон">
                <label class="modal__form-labels" for="telegram">НИК В ТЕЛЕГЕ</label>
                <input class="modal__form-inputs" type="text" id="telegram" name="telegram"
                    placeholder="Ник в Telegram (необязательное поле)">
                <button class="modal__form-button" type="submit">Отправить</button>
            </form>
        </div>
    </div>
</template>

<style>
.modal-wrapper {
    z-index: 102;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.modal {
    position: relative;
    max-width: 407px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(135deg, rgb(255, 200, 80) 0%, rgb(255, 140, 50) 40%, rgb(200, 80, 80) 100%);
    gap: 26px;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 0px 100px 20px rgba(240, 172, 70, 0.22);
}

.modal__title {
    font-family: var(--second-family);
    font-weight: 800;
    font-size: 22px;
    color: var(--header-background);
}

.modal__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal__form-labels {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 6px;
    color: var(--header-background);
}

.modal__form-inputs {
    margin-bottom: 14px;
    border: 1px solid #3a3a3c;
    border-radius: 8px;
    padding: 12px 14px;
    width: 100%;
    height: 41px;
    background-color: var(--logo-blue);
    color: var(--btn-text);
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
}

.modal__form-inputs::placeholder {
    color: rgb(255, 255, 255, 0.75);
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
}

.modal__form-button {
    margin-top: 12px;
    border-radius: 8px;
    padding: 14px;
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 20px;
    border: none;
    cursor: pointer;
    background-color: var(--white-text);
    color: var(--header-background);
}

.modal__form-button:hover {
    background-color: rgb(235, 235, 235);
    ;
}

.close-btn {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
    width: 20px;
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
    top: 5px;
    color: #333;
}

.close-btn:hover {
    color: white;
}

/* ПЛАНШЕТ */
@media (min-width: 768px) {
    .modal {
        max-width: 832px;
    }
}

@media (min-width: 1440px) {
    .modal {
        max-width: 1600px;
    }
}
</style>