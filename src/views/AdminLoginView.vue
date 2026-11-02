<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter(); // нужен, чтобы после входа перейти на другую страницу
const auth = useAuthStore();

const email = ref(''); //v-model: что печатает человек, то сразу лежит в email.value.
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const submit = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        await auth.login(email.value, password.value);
        // replace вместо push: страница входа не остаётся в истории,
        // и кнопка «Назад» не вернёт уже вошедшего админа на форму.
        router.replace({ name: 'admin' });
    } catch (error) {
        console.error(error);

        if (error.status === 429) {
            // Сработало ограничение throttle:5,1 на бэкенде.
            errorMessage.value = 'Слишком много попыток. Подождите минуту и повторите.';
        } else {
            // 422: сервер прислал сообщение по полю (например, «Неверный email или пароль.»).
            // ?. защищает от ситуации, когда error.errors нет (например, сервер недоступен).

            //             ?. (опциональная цепочка). Запись error.errors?.email?.[0] читается так: «если errors существует, возьми email; если и он существует, возьми первый элемент». Если на любом шаге значения нет, выражение не падает с ошибкой, а возвращает undefined. Без ?. случай с TypeError (где errors нет) привёл бы к новой ошибке прямо внутри catch. Вариант ?.[0] это тот же ?., только для обращения по индексу.

            // || как цепочка «возьми первое найденное». Оператор || возвращает первое «истинное» значение слева направо. Получается такая логика:

            // есть ошибка по email? Берём её;
            // нет? Есть ошибка по password? Берём её;
            // нет ни той, ни другой? Подставляем общую фразу.
            errorMessage.value =
                error.errors?.email?.[0] ||
                error.errors?.password?.[0] ||
                'Не удалось войти. Попробуйте позже.';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="admin-login">
        <!-- @submit.prevent: отправка формы срабатывает и по кнопке, и по Enter;
             .prevent отключает стандартное поведение браузера (перезагрузку страницы). -->
        <form class="admin-login__form" @submit.prevent="submit">
            <h1 class="admin-login__title">Вход для администратора</h1>

            <label class="admin-login__field">
                <span>Email</span>
                <input v-model="email" type="email" autocomplete="username" required />
            </label>

            <label class="admin-login__field">
                <span>Пароль</span>
                <input v-model="password" type="password" autocomplete="current-password" required />
            </label>

            <p v-if="errorMessage" class="admin-login__error" role="alert">{{ errorMessage }}</p>

            <!-- disabled на время запроса защищает от повторных нажатий -->
            <button class="g-button" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Вход...' : 'Войти' }}
            </button>
        </form>
    </div>
</template>

<style>
.admin-login {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.admin-login__form {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background-color: var(--white-text);
    border-radius: 8px;
}

.admin-login__title {
    font-family: var(--second-family);
    font-size: 22px;
    color: var(--tarrifs-title-text);
}

.admin-login__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
}

.admin-login__field input {
    padding: 10px 12px;
    border: 1px solid var(--grey-text);
    border-radius: 6px;
    font-size: 16px;
}

.admin-login__error {
    color: #c62828;
    font-size: 14px;
}

.admin-login__form .g-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
