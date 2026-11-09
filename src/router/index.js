import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '@/views/ServicesView.vue'
import FitnesGymView from '@/views/FitnesGymView.vue'
import { useAuthStore } from '@/stores/auth' // <-- Добавляем импорт стора

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/gym',
      name: 'gym',
      component: FitnesGymView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminServicesView.vue'),
    },
  ],
})

// <-- Добавляем глобальный guard
router.beforeEach(async (to) => {//это функция, которая срабатывает перед каждым переходом на новую страницу.
  // У неё есть 3 параметра:
  // to — куда пользователь хочет пойти (например, /admin).
  // from — откуда он пришёл (например, /).
  // next — функция, которая даёт "зелёный свет". Если её не вызвать, переход зависнет.
  const auth = useAuthStore()

  // Проверяем только маршруты, начинающиеся с /admin
  if (to.path.startsWith('/admin')) {// Проверяем, туда ли он вообще лезет
    if (to.name === 'admin-login') {
      // Если уже вошёл, не даём снова смотреть на форму логина
      if (auth.isLoggedIn) {
        const isValid = await auth.checkAuth()
        if (isValid) return { name: 'admin' };
      }
      return true// Если путь НЕ начинается с /admin, просто пропускаем (next())
    }
    //     Логика: Если человек уже вошёл в систему (у него есть токен), зачем ему снова смотреть на форму логина?
    // Мы проверяем, есть ли токен локально (auth.isLoggedIn).
    // Если есть, мы спрашиваем у сервера: "Эй, этот токен ещё живой?" (await auth.checkAuth()). Это важно, потому что токен могли удалить на сервере, пока пользователь был на другой вкладке.
    // Если сервер говорит "Да, всё ок" (isValid === true), мы автоматически перенаправляем его в саму админку: next({ name: 'admin' }).
    // Если токена нет или он невалиден, мы просто разрешаем показать форму входа: return next().

    // Для всех остальных админских страниц требуем валидный токен
    const isValid = await auth.checkAuth()
    if (!isValid) {
      return { name: 'admin-login' }
    }
  }

  return true
})

export default router
