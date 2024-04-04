import { createSlice } from "@reduxjs/toolkit";
// import { modules } from "../../Database";


const initialState = {
  modules: [] as any[],
  module: { name: "New Module", description: "New Description" },
};


const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // populate the modules state variable when we retrieve modules from the server
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.modules,
      ];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { addModule, deleteModule,
  updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;