/* eslint-disable */
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import App from './App.vue'
import TxOut from './components/TxOut.vue'
import Paginator from 'primevue/paginator';

// import CSS resources
import 'primevue/resources/primevue.min.css'            // core 
//import '/node_modules/primeflex/themes/primeone-light.css'  // theme
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'                      // icons
import '/node_modules/primeflex/primeflex.css'          // PrimeFlex
import router from './router'


const app = createApp(App).use(router);
app.use(PrimeVue);
app.component('TestPanel', Panel);
app.component('TestButton', Button);
app.component('TestInputText', InputText);
app.component('TestDataTable', DataTable);
app.component('TestColumn', Column);
app.component('TestMenubar', Menubar);
app.component('TestTabView', TabView);
app.component('TestTabPanel', TabPanel);
app.component('TestDialog', Dialog);
app.component('TestTextaream', Textarea);
app.component('TestScrollPanel', ScrollPanel);
app.component('TestPaginator', Paginator);
app.component('tx-out', TxOut)
app.mount('#app');
