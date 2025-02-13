export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LogIn.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    // @ts-ignore
    component: () => import('@/views/SignUp.vue'),
    meta: { auth: false },
  },
  {
    path: '/',
    name: 'Dashboard',
    // @ts-ignore
    component: () => import('@/views/MainDashboard.vue'),
    meta: { auth: true },
  },
  {
    path: '/add-blog',
    name: 'Add-Blog',
    // @ts-ignore
    component: () => import('@/views/AddEditBlog.vue'),
    meta: { auth: true },
  },
  {
    path: '/edit-blog/:id',
    name: 'Edit-Blog',
    // @ts-ignore
    component: () => import('@/views/AddEditBlog.vue'),
    meta: { auth: true },
  },
]
