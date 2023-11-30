import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    web3: null,
    web3Modal: null,
    socket: null,
    walletConnected: null,
    welcomeMessage: false,
    contracts: {},
    contractsInitialized: false,
    loading: false,
    alert: null,
    alertType: null,
    alertText: null,
    newPostCounter: 0
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

    setSocket: (state, { payload }) => {
      state.socket = payload;
    },

    setWeb3: (state, { payload }) => {
      state.web3 = payload;
    },

    setWeb3Modal: (state, { payload }) => {
      state.web3Modal = payload;
    },

    setWelcome: (state, { payload }) => {
      state.welcomeMessage = payload;
    },

    setAlert: (state, { payload }) => {
      state.alert = payload.alert;
      state.alertType = payload.alertType;
      state.alertText = payload.alertText;
    },

    setWalletConnected: (state, { payload }) => {
      state.walletConnected = payload;
    },

    setContracts: (state, { payload }) => {
      state.contracts = payload;
    },

    setContractInitialized: (state, { payload }) => {
      state.contractsInitialized = payload;
    },

    newPostCounter: (state) => {
      state.newPostCounter++;
    },

    initNewPostCounter: (state) => {
      state.newPostCounter = 0;
    }
  },
});

export const {
  setLoading,
  setAlert,
  setSocket,
  setWeb3,
  setWeb3Modal,
  setWalletConnected,
  setWelcome,
  setContractInitialized,
  setContracts,
  newPostCounter,
  initNewPostCounter
} = appSlice.actions;
export default appSlice.reducer;
