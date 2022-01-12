import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import wl from "wl-tree-transfer";
import "wl-tree-transfer/lib/wl-tree-transfer.css"


import './assets/css/icon.css'
const app = createApp(App)
installElementPlus(app)
app

    .use(wl)
    .use(store)
    .use(router)
    .mount('#app')