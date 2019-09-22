import Vue from 'vue';
import App from './App';
import store from './store';

new Vue({
    el: '#root',
    store,
    components: {App},
    render: h => h(App)
});
