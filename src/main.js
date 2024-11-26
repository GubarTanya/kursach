import './assets/main.css'
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {getAuth } from "firebase/auth";
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import { getStorage } from 'firebase/storage';
import {createPinia} from "pinia";


const firebaseConfig = {
  apiKey: "AIzaSyCfwg3EKbEuCVGbjT033jEidEvvXzIzkck",
  authDomain: "photographer-269e5.firebaseapp.com",
  databaseURL: "https://photographer-269e5-default-rtdb.firebaseio.com",
  projectId: "photographer-269e5",
  storageBucket: "photographer-269e5.appspot.com",
  messagingSenderId: "540160111133",
  appId: "1:540160111133:web:1fe1b7c4a32f4861248cf4"
};

const apps = initializeApp(firebaseConfig);
const db = getDatabase(apps)
const auth = getAuth(apps)
const storage = getStorage(apps)

const app = createApp(App)


app.use(router)

app.use(createPinia())

app.mount('#app')
createApp(App)
    .use(store)
    // .mount('#app');

export {
    apps,
    db,
    auth,
    storage
}