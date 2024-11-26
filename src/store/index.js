import { createStore } from 'vuex';
import authService from './authService';

export default createStore({
    modules: {
        auth: {
            state: {
                token: null,
                isAuthenticated: false
            },
            mutations: {
                SET_TOKEN(state, token) {
                    state.token = token;
                    state.isAuthenticated = true;
                },
                CLEAR_TOKEN(state) {
                    state.token = null;
                    state.isAuthenticated = false;
                }
            },
            actions: {
                async login({ commit }, credentials) {
                    try {
                        const { token } = await authService.login(credentials);
                        commit('SET_TOKEN', token);
                        return true;
                    } catch (error) {
                        // Обработка ошибок
                        return false;
                    }
                },
                logout({ commit }) {
                    commit('CLEAR_TOKEN');
                }
            }
        }
    }
});