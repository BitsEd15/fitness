const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'admin_token';

// Слово export делает функцию доступной из других файлов, а там её подключают через import { request } from '@/api/http'
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token); // сохраняет токен в хранилище.
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);//извлекает токен по указанному ключу
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);//удаляет токен из хранилища
}

export class ApiError extends Error { // создаем класс ошибки, для дальнейшего создания экземпляра
    constructor(status, data) {
        //status это число: 404, 422, 500 и так далее.
        //data это разобранный JSON из ответа сервера или null, если тела не было.
        // super(...) Эта строка вызывает конструктор родителя, то есть Error, и передаёт ему текст ошибки.
        super(data?.message || `Ошибка запроса: ${status}`); //?. (опциональная цепочка)
        this.status = status;//this внутри конструктора это тот объект, который сейчас создаётся. Строки this.status = status; и this.errors = ... записывают в него свои поля.
        this.errors = data?.errors ?? {};//?? это «значение по умолчанию только для отсутствующих». Он возвращает правую часть, только если слева null или undefined. Отличие от ||: ?? не реагирует на 0, '' и false, там они считаются нормальными значениями. Здесь это не критично, но ?? точнее передаёт смысл: «если ошибок по полям нет, то пустой объект».
    }
}

export async function request(path, { method = 'GET', body } = {}) {//{ method, body } это деструктуризация: функция принимает объект и сразу достаёт из него поля method и body в отдельные переменные. method = 'GET' значение по умолчанию.
    const headers = { Accept: 'application/json' };
    const token = getToken();

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${path}`, {
        method, //Мы пишем просто ключ и method, headers, потому что имя ключа совпадает с именем переменной. А можно было бы написать method: method
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = response.status === 204 //Статус 204 значит «успешно, тела нет» (мы так отвечаем на удаление).
        ? null
        : await response.json().catch(() => null);

    if (!response.ok) {
        if (response.status === 401) {//401 значит, что токен недействителен. Мы его удаляем, чтобы страница потом отправила человека на вход.
            clearToken();
        }
        throw new ApiError(response.status, data);
    }

    return data;
}