import Vue from 'vue';
import VueRouter from 'vue-router';
import ability from '../services/ability';
import { PERMISSIONS_ADMIN } from '../constants/permissions';
import { USER_MANAGEMENT } from '../constants/methods';
import { checkValidToken } from '../services/checkValidToken';
import { updateIsLogged } from '../services/updateIsLogged';
import { updatePermissionsAbility } from '../services/updatePermissionsAbility';
import { getUserCurrent, setUserCurrent } from '../services/userCurrent';
import { TOKEN } from '../constants/settings';

Vue.use(VueRouter);

const routes = [
  /** Publics */
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/privacy',
    component: () => import('../views/Privacy.vue'),
  },
  {
    path: '/support',
    component: () => import('../views/Support.vue'),
  },
  {
    path: '/plans',
    name: 'plans',
    component: () => import('../views/Plans.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login/forgot-password',
    name: 'forgot-password',
    component: () =>
      import('../views/RecoverPassword/SendEmailRecoverPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login/reset-password',
    name: 'reset-password',
    component: () => import('../views/RecoverPassword/ResetPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/Loading.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('../views/Confirm.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboards',
    name: 'dashboards',
    component: () => import('../views/Dashboards.vue'),
    meta: { requiresAuth: true },
    redirect: { name: 'dashboard-monthly' },
    children: [
      {
        path: 'general-test',
        name: 'dashboard-general-test',
        component: () =>
          import('../components/dashboards/DashboardGeneralV2.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'daily',
        name: 'dashboard-daily',
        component: () => import('../components/dashboards/DashboardDaily.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'weekly',
        name: 'dashboard-weekly',
        component: () => import('../components/dashboards/DashboardWeekly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'monthly',
        name: 'dashboard-monthly',
        component: () =>
          import('../components/dashboards/DashboardMonthly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'quarterly',
        name: 'dashboard-quartely',
        component: () =>
          import('../components/dashboards/DashboardQuarterly.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'annual',
        name: 'dashboard-annual',
        component: () => import('../components/dashboards/DashboardAnnual.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/activities',
    redirect: '/activities/calendar',
    component: () => import('../views/Activities.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'activities-table',
        component: () => import('../components/activities/ActivitiesTable.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'calendar',
        name: 'activities-calendar',
        component: () =>
          import('../components/activities/ActivitiesCalendar.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/Contacts.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contact/:id',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/companies',
    name: 'companies',
    component: () => import('../views/Companies.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/company/:id',
    name: 'company',
    component: () => import('../views/Company.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pipeline/new',
    name: 'new-pipeline',
    component: () => import('../views/PipelineCreate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pipeline/edit/:id',
    name: 'edit-pipelines',
    component: () => import('../views/PipelineEdit.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pipeline/:id',
    name: 'pipeline-id',
    component: () => import('../views/Pipelines.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pipeline',
    name: 'pipeline',
    component: () => import('../views/Pipelines.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/deals',
    name: 'deals',
    component: () => import('../views/Pipelines.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/deal/:id',
    name: 'deal',
    component: () => import('../views/Deal.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    component: () => import('../views/Settings/Index.vue'),
    meta: { requiresAuth: true },
    redirect: { name: 'profile' },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Settings/ProfileAndPreferences.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'password',
        name: 'password-and-login',
        component: () =>
          import('../views/Settings/PasswordAndLoginSettings.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'enterprise',
        name: 'settings-enterprise-base',
        component: () => import('../views/Settings/SettingsEnterprise.vue'),
        meta: { requiresAuth: true },
        redirect: () => {
          return 'enterprise/general';
        },
      },
      {
        path: 'enterprise/:subconfig',
        name: 'settings-enterprise-general',
        component: () => import('../views/Settings/SettingsEnterprise.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'enterprise/:subconfig/:section',
        name: 'settings-enterprise',
        component: () => import('../views/Settings/SettingsEnterprise.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'email',
        name: 'settings-email',
        component: () => import('../views/Settings/SettingsEmail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'calendar',
        name: 'settings-calendar',
        component: () => import('../views/Settings/SettingsCalendar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: () => import('../views/Settings/SettingsSubscription.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'billing',
        name: 'billing',
        component: () => import('../views/Billing.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('../views/Invoices.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'imports-data/:section',
        name: 'imports',
        component: () => import('../views/Settings/SettingsImports.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'enterprises',
        name: 'enterprises',
        component: () =>
          import('../components/settingsEnterprise/Enterprises.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/email',
    component: () => import('../views/Email.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'inbox',
        name: 'inbox',
        component: () => import('../components/emails/Inbox.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inbox/:id',
        name: 'email-content-inbox',
        component: () => import('../components/emails/EmailContent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'sent',
        name: 'sent',
        component: () => import('../components/emails/Sent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'sent/:id',
        name: 'email-content-sent',
        component: () => import('../components/emails/EmailContent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'spam',
        name: 'spam',
        component: () => import('../components/emails/Spam.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'spam/:id',
        name: 'email-content-spam',
        component: () => import('../components/emails/EmailContent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'trash',
        name: 'trash',
        component: () => import('../components/emails/Trash.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'trash/:id',
        name: 'email-content-trash',
        component: () => import('../components/emails/EmailContent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'templates',
        name: 'email-templates',
        component: () => import('../components/emails/EmailTemplates.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
    meta: { requiresAuth: true, keyId: USER_MANAGEMENT },
  },
  {
    path: '/page404',
    name: 'page404',
    component: () => import('../views/Page404.vue'),
  },
  {
    path: '/page401',
    name: 'page401',
    component: () => import('../views/ErrorPageUnauthorized.vue'),
  },
  { path: '*', component: () => import('../views/ErrorPage.vue') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // Scroll to top when you change the view
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

const userAuth = async () => {
  // Get user
  const userCurrent = await getUserCurrent();
  // Set to cache
  await setUserCurrent(userCurrent);
  const {
    id,
    role,
    group: { permissions },
  } = userCurrent;
  // Update permissions
  await updatePermissionsAbility(id, role, permissions);
  // Login is true
  await updateIsLogged(true);
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => !record.meta.requiresAuth)) {
    // Page free
    if (to.name === 'login') {
      if (localStorage.getItem(TOKEN)) {
        if (await checkValidToken('pipeline')) {
          await userAuth();
          next({
            path: '/pipeline',
          });
        } else {
          // Remove token
          localStorage.removeItem(TOKEN);
          // Next /login
          next();
        }
      } else {
        // Next /login
        next();
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Page block with token
    const canPass = to.name ? await checkValidToken(to.name) : false;
    if (canPass) {
      await userAuth();
      // Page block with permission
      if (to.matched.some((record) => record.meta.keyId)) {
        if (ability.can(to.meta.keyId, PERMISSIONS_ADMIN)) {
          next();
        } else {
          // No authorization
          next({
            path: '/page404',
          });
        }
      } else {
        next();
      }
    } else {
      next({
        path: '/login',
      });
    }
  }
});

export default router;
