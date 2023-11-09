import VueRouter from 'vue-router'
import Home from "@/views/home/Home.vue";
import About from "@/views/home/About.vue";
import SignIn from "@/views/home/SignIn.vue";
import SignUp from "@/views/home/SignUp.vue";
import VerifyEmail from "@/views/home/VerifyEmail.vue";
import store from "@/store";

const router = new VueRouter({
    mode: 'history',
    routes:[
        { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
        { path: '/todos', name: 'todos', component: Home, meta: { requiresAuth: true } },
        { path: '/about', name: 'about', component: About, meta: { requiresAuth: false } },
        { path: '/sign-in', name: 'sign-in', component: SignIn, meta: { requiresAuth: false } },
        { path: '/sign-up', name: 'sign-up', component: SignUp, meta: { requiresAuth: false } },
        { path: '/verify', name: 'verify', component: VerifyEmail, meta: { requiresAuth: false } },
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthorized = store.state.isAuthenticated;

    if ( to.meta.requiresAuth && ! isAuthorized )  {
        return next({ name: 'sign-in' });
    }
    if ( (to.name == 'sign-in' || to.name == 'sign-up') && isAuthorized ) {
        return next({ name: 'home' })
    }
    return next();
})

export default router;