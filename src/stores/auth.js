import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request, getToken, setToken, clearToken } from '@/api/http'

export const useAuthStore = defineStore('auth', () => {
    // Токен как реактивное значение. Начальное значение берём из localStorage:
    // так после перезагрузки страницы админ остаётся «вошедшим».
    const token = ref(getToken())

    // «Вошёл ли админ» вычисляется из токена, отдельно это не хранится.
    // !! превращает значение в true/false: токен есть = true, null = false.
    const isLoggedIn = computed(() => Boolean(token.value))

    // Вход. Ошибки (ApiError) намеренно не ловим: пусть страница входа сама
    // решит, что показать (например, error.errors.email для неверного пароля).
    const login = async (email, password) => {
        const data = await request('/admin/login', {
            method: 'POST',
            body: { email, password },
        })

        setToken(data.token) // сохраняем в localStorage, чтобы пережить перезагрузку
        token.value = data.token // и в реактивное значение, чтобы Vue обновил интерфейс .localStorage не реактивен. Если токен в нём изменится, Vue этого не заметит, и ни шапка, ни страницы не обновятся. Поэтому токен дублируется в ref
    }

    // Полный сброс: и хранилище, и реактивное значение.
    // Выделен в отдельную функцию, потому что нужен в нескольких местах.
    const reset = () => {
        clearToken()
        token.value = null
    }

    // Выход. Сервер удаляет токен, но локально выходим в любом случае (finally):
    // даже если сервер недоступен или токен уже недействителен, человек должен выйти.
    const logout = async () => {
        try {
            await request('/admin/logout', { method: 'POST' })
        } catch (error) {
            console.error(error)
        } finally {
            reset()
        }
    }

    // Проверка, что токен реально работает. Нужна для router guard:
    // наличие токена в localStorage ещё не значит, что он действителен
    // (его могли удалить на сервере или он мог устареть).
    const checkAuth = async () => {
        if (!token.value) {
            return false
        }

        try {
            await request('/admin/me')
            return true
        } catch (error) {
            // 401 (токен недействителен) и 403 (не админ): токен бесполезен, сбрасываем.
            // При других ошибках (например, сервер недоступен) токен не трогаем:
            // он может быть вполне рабочим, просто сейчас не достучаться.
            if (error.status === 401 || error.status === 403) {
                reset()
            }
            return false
        }
    }

    return { token, isLoggedIn, login, logout, checkAuth, reset }
})
