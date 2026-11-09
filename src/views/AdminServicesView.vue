<script setup>
import { ref, onMounted } from 'vue'
import { request } from '@/api/http'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const services = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const isSaving = ref(false) // Для блокировки кнопки при сохранении

// Состояние формы
const isEditing = ref(false)
const originalService = ref(null) // Храним оригинал, чтобы понять, какие цены удалились
const form = ref({
    id: null,
    title: '',
    description: '',
    is_active: true,
    sort_order: 0,
    prices: [] // Массив цен: [{ id: 1, label: '1 занятие', sessions_count: 1, price: 1000 }]
})

const loadServices = async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        services.value = await request('/admin/services')
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Не удалось загрузить услуги.'
        if (error.status === 401 || error.status === 403) {
            auth.reset()
            router.replace({ name: 'admin-login' })
        }
    } finally {
        isLoading.value = false
    }
}

const resetForm = () => {
    isEditing.value = false
    originalService.value = null
    form.value = {
        id: null,
        title: '',
        description: '',
        is_active: true,
        sort_order: 0,
        prices: [{ id: null, label: '', sessions_count: 1, price: 0 }] // Одна пустая строка по умолчанию
    }
}

const editService = (service) => {
    isEditing.value = true //Говорит Vue: "Мы больше не создаём новую услугу, мы редактируем старую".
    originalService.value = JSON.parse(JSON.stringify(service)) // Глубокая копия для сравнения. Создаёт полную, независимую копию объекта service и сохраняет её в originalService.

    // Если у услуги нет цен, добавляем одну пустую строку для удобства
    const pricesToEdit = service.prices && service.prices.length > 0//"Есть ли у этой услуги массив цен, и больше ли в нём 0 элементов?"
        // В Vue объекты реактивны. Если бы мы написали просто originalService.value = service, то originalService и service указывали бы на один и тот же объект в памяти.
        ? JSON.parse(JSON.stringify(service.prices))
        : [{ id: null, label: '', sessions_count: 1, price: 0 }]

    form.value = {
        id: service.id,
        title: service.title,
        description: service.description,
        is_active: service.is_active,
        sort_order: service.sort_order,
        prices: pricesToEdit
    }
}

const addPriceRow = () => {
    form.value.prices.push({ id: null, label: '', sessions_count: 1, price: 0 })
}

const removePriceRow = (index) => {
    form.value.prices.splice(index, 1)
}

const submitForm = async () => {
    //Подготовка и блокировка интерфейса
    isSaving.value = true
    errorMessage.value = ''

    try {
        let savedService

        // 1. Сохраняем саму услугу
        if (isEditing.value) {
            savedService = await request(`/admin/services/${form.value.id}`, {
                method: 'PUT',
                body: {
                    title: form.value.title,
                    description: form.value.description,
                    is_active: form.value.is_active,
                    sort_order: form.value.sort_order
                }
            })
        } else {
            savedService = await request('/admin/services', {
                method: 'POST',
                body: {
                    title: form.value.title,
                    description: form.value.description,
                    is_active: form.value.is_active,
                    sort_order: form.value.sort_order
                }//Чтобы создать или обновить цены, нам обязательно нужен id услуги. Если мы создаём новую услугу, бэкенд вернёт нам этот id в переменной savedService. Без этого шага мы не сможем привязать цены к правильной услуге.
            })
        }

        // 2. Синхронизируем цены (только если услуга успешно сохранена)
        const serviceId = savedService.id
        const originalPrices = originalService.value?.prices || []//`||` — оператор логического ИЛИ. Если результат предыдущего выражения (массив цен) оказался `null` или `undefined` (то есть коалесцировал в `undefined`), то вернётся пустой массив ``. Таким образом, в переменной `originalPrices` всегда будет массив — пустой, если данных нет, или тот самый массив цен, если он был в исходнике
        const newPrices = form.value.prices

        // А) Удаляем цены, которые были в оригинале, но исчезли из формы
        for (const origPrice of originalPrices) {
            const stillExists = newPrices.find(p => p.id === origPrice.id)
            if (!stillExists && origPrice.id) {
                await request(`/admin/prices/${origPrice.id}`, { method: 'DELETE' })
            }
        }

        // Б) Создаем или обновляем цены из формы
        for (const price of newPrices) {
            // Пропускаем полностью пустые строки, если пользователь их не заполнил
            if (!price.label.trim()) continue

            const payload = {
                label: price.label,
                sessions_count: Number(price.sessions_count),
                price: Number(price.price)
            }

            if (price.id) {
                // Обновление существующей цены
                await request(`/admin/prices/${price.id}`, {
                    method: 'PUT',
                    body: payload
                })
            } else {
                // Создание новой цены
                await request(`/admin/services/${serviceId}/prices`, {
                    method: 'POST',
                    body: payload
                })
            }
        }

        resetForm()
        await loadServices()
    } catch (error) {
        console.error('Ошибка сохранения:', error)
        if (error.errors) {
            const firstError = Object.values(error.errors)[0]?.[0]
            errorMessage.value = firstError || 'Ошибка валидации данных'
        } else {
            errorMessage.value = 'Ошибка при сохранении. Попробуйте позже.'
        }
    } finally {
        isSaving.value = false
    }
}

const deleteService = async (id) => {
    if (!confirm('Вы уверены? Это удалит услугу и все её цены безвозвратно.')) return
    try {
        await request(`/admin/services/${id}`, { method: 'DELETE' })
        await loadServices()
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Ошибка при удалении'
    }
}

const logout = async () => {
    await auth.logout()
    router.replace({ name: 'admin-login' })
}

// Инициализация формы при первом открытии
resetForm()
onMounted(loadServices)
</script>

<template>
    <div class="admin-page">
        <header class="admin-header">
            <h1>Управление услугами</h1>
            <button class="g-button g-button--secondary" @click="logout">Выйти</button>
        </header>

        <div v-if="errorMessage" class="error-message" role="alert">
            {{ errorMessage }}
        </div>

        <!-- Форма добавления/редактирования -->
        <div class="admin-form">
            <h2>{{ isEditing ? 'Редактировать услугу' : 'Добавить новую услугу' }}</h2>
            <form @submit.prevent="submitForm" class="form-grid">
                <div class="form-group full-width">
                    <label>Название</label>
                    <input v-model="form.title" type="text" required placeholder="Например: Персональная тренировка" />
                </div>

                <div class="form-group full-width">
                    <label>Описание</label>
                    <textarea v-model="form.description" rows="3" required
                        placeholder="Краткое описание услуги"></textarea>
                </div>

                <div class="form-group">
                    <label>Порядок сортировки</label>
                    <input v-model.number="form.sort_order" type="number" min="0" max="255" required />
                </div>

                <div class="form-group checkbox-group">
                    <label class="checkbox-label">
                        <input v-model="form.is_active" type="checkbox" />
                        <span>Активна для показа на сайте</span>
                    </label>
                </div>

                <!-- Блок управления ценами -->
                <div class="form-group full-width prices-section">
                    <div class="prices-header">
                        <label>Варианты цен</label>
                        <button type="button" class="g-button g-button--small g-button--secondary" @click="addPriceRow">
                            + Добавить цену
                        </button>
                    </div>

                    <div class="prices-list">
                        <div v-for="(price, index) in form.prices" :key="index" class="price-row">
                            <div class="price-field">
                                <input v-model="price.label" type="text" placeholder="Название (напр. 'Абонемент')"
                                    required />
                            </div>
                            <div class="price-field small">
                                <input v-model.number="price.sessions_count" type="number" min="1" placeholder="Кол-во"
                                    required />
                                <span class="field-hint">занятий</span>
                            </div>
                            <div class="price-field small">
                                <input v-model.number="price.price" type="number" min="0" placeholder="Стоимость"
                                    required />
                                <span class="field-hint">₽</span>
                            </div>
                            <button type="button" class="g-button g-button--danger g-button--icon"
                                @click="removePriceRow(index)" :disabled="form.prices.length === 1"
                                title="Удалить строку">
                                ✕
                            </button>
                        </div>
                    </div>
                </div>

                <div class="form-actions full-width">
                    <button type="submit" class="g-button" :disabled="isSaving">
                        {{ isSaving ? 'Сохранение...' : (isEditing ? 'Сохранить изменения' : 'Добавить услугу') }}
                    </button>
                    <button v-if="isEditing" type="button" class="g-button g-button--secondary" @click="resetForm">
                        Отмена
                    </button>
                </div>
            </form>
        </div>

        <!-- Список услуг (Адаптивная таблица) -->
        <div class="admin-list">
            <h2>Список услуг</h2>
            <div v-if="isLoading" class="loading">Загрузка...</div>
            <div v-else-if="services.length === 0" class="empty">Услуг пока нет. Добавьте первую!</div>

            <div v-else class="table-wrapper">
                <table class="services-table">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th class="hide-mobile">Порядок</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="service in services" :key="service.id">
                            <td>
                                <div class="service-title">{{ service.title }}</div>
                                <div class="service-prices-preview">
                                    {{ service.prices?.length || 0 }} вар. цен
                                </div>
                            </td>
                            <td class="hide-mobile">{{ service.sort_order }}</td>
                            <td>
                                <span :class="service.is_active ? 'status-active' : 'status-inactive'">
                                    {{ service.is_active ? 'Активна' : 'Скрыта' }}
                                </span>
                            </td>
                            <td class="actions">
                                <button class="g-button g-button--small" @click="editService(service)">Изменить</button>
                                <button class="g-button g-button--danger g-button--small"
                                    @click="deleteService(service.id)">Удалить</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- Базовые стили --- */
.admin-page {
    flex: 1;
    padding: 16px;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
}

.admin-header h1 {
    font-size: 1.5rem;
    margin: 0;
}

.error-message {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 14px;
}

/* --- Форма --- */
.admin-form {
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 32px;
    border: 1px solid #e5e7eb;
}

.admin-form h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.25rem;
    color: #111827;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group textarea {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 15px;
    /* 15px предотвращает зум на iOS при фокусе */
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-group {
    justify-content: center;
}

.checkbox-label {
    flex-direction: row !important;
    align-items: center;
    gap: 8px !important;
    cursor: pointer;
}

.checkbox-label input {
    width: auto;
    cursor: pointer;
}

/* --- Секция цен --- */
.prices-section {
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px dashed #d1d5db;
}

.prices-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.prices-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.price-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 8px;
    align-items: end;
}

.price-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.price-field.small {
    position: relative;
}

.field-hint {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #6b7280;
    pointer-events: none;
}

/* --- Кнопки --- */
.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    flex-wrap: wrap;
}

.g-button {
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background-color: #3b82f6;
    color: white;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    /* Удобно для пальцев на телефоне */
}

.g-button:hover:not(:disabled) {
    background-color: #2563eb;
}

.g-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.g-button--secondary {
    background-color: #6b7280;
}

.g-button--secondary:hover:not(:disabled) {
    background-color: #4b5563;
}

.g-button--danger {
    background-color: #ef4444;
}

.g-button--danger:hover:not(:disabled) {
    background-color: #dc2626;
}

.g-button--small {
    padding: 6px 12px;
    font-size: 13px;
    min-height: 36px;
}

.g-button--icon {
    padding: 0;
    width: 44px;
    height: 44px;
    font-size: 18px;
}

/* --- Таблица (Адаптивная) --- */
.admin-list h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    color: #111827;
}

.table-wrapper {
    overflow-x: auto;
    /* Горизонтальный скролл на маленьких экранах */
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    -webkit-overflow-scrolling: touch;
    /* Плавный скролл на iOS */
}

.services-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background: white;
    min-width: 600px;
    /* Минимальная ширина, чтобы таблица не сжималась в кашу */
}

.services-table th,
.services-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
}

.services-table th {
    background-color: #f3f4f6;
    font-weight: 600;
    color: #4b5563;
    white-space: nowrap;
}

.service-title {
    font-weight: 500;
    color: #111827;
}

.service-prices-preview {
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
}

.status-active {
    color: #059669;
    font-weight: 500;
    display: inline-block;
    padding: 2px 8px;
    background: #d1fae5;
    border-radius: 999px;
    font-size: 12px;
}

.status-inactive {
    color: #dc2626;
    font-weight: 500;
    display: inline-block;
    padding: 2px 8px;
    background: #fee2e2;
    border-radius: 999px;
    font-size: 12px;
}

.actions {
    display: flex;
    gap: 8px;
    white-space: nowrap;
}

.loading,
.empty {
    padding: 24px;
    text-align: center;
    color: #6b7280;
    background: #f9fafb;
    border-radius: 8px;
}

/* --- АДАПТИВНОСТЬ (Mobile) --- */
@media (max-width: 640px) {
    .admin-page {
        padding: 12px;
    }

    .form-grid {
        grid-template-columns: 1fr;
        /* Одна колонка на телефоне */
        gap: 12px;
    }

    .price-row {
        grid-template-columns: 1fr;
        /* Цены друг под другом на телефоне */
        gap: 8px;
        padding: 12px;
        background: #f3f4f6;
        border-radius: 6px;
        position: relative;
    }

    .price-field.small input {
        padding-right: 30px;
        /* Место для подсказки "₽" или "занятий" */
    }

    .g-button--icon {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        font-size: 16px;
    }

    .hide-mobile {
        display: none;
        /* Скрываем менее важные колонки в таблице */
    }

    .services-table th,
    .services-table td {
        padding: 10px 12px;
    }
}
</style>