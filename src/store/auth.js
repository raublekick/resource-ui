import AuthService from "../api/auth";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

// const state = {
//   user: user,
//   state: initialState
// };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit, state }, user) {
      return AuthService.login(user).then(
        user => {
          commit("loginSuccess", user.data);
          localStorage.setItem("user", JSON.stringify(state.user));
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    refreshToken({ commit, state }) {
      return AuthService.refreshToken(state.user.refreshToken).then(
        response => {
          commit("setToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(state.user));
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    register({ commit, state }, user) {
      return AuthService.register(user).then(
        user => {
          commit("loginSuccess", user.data);
          localStorage.setItem("user", JSON.stringify(state.user));
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    setToken(state, token) {
      state.user.token = token;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
