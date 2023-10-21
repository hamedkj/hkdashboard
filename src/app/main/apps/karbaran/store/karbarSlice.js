import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "@history";
import KarbarModel from "../model/KarbarModel";

export const getKarbar = createAsyncThunk(
  "karbaranApp/task/getKarbar",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`/api/karbaran/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      history.push({ pathname: `/apps/karbaran` });

      return null;
    }
  }
);

export const addKarbar = createAsyncThunk(
  "karbaranApp/karbaran/addKarbar",
  async (karbar, { dispatch, getState }) => {
    const response = await axios.post("/api/karbaran", karbar);

    const data = await response.data;

    return data;
  }
);

export const updateKarbar = createAsyncThunk(
  "karbaranApp/karbaran/updateKarbar",
  async (karbar, { dispatch, getState }) => {
    const response = await axios.put(`/api/karbaran/${karbar.id}`, karbar);

    const data = await response.data;

    return data;
  }
);

export const removeKarbar = createAsyncThunk(
  "karbaranApp/karbararn/removeKarbar",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/contacts/${id}`);

    await response.data;

    return id;
  }
);

export const selectkarbar = ({ karbaranApp }) => karbaranApp.karbar;

const karbarSlice = createSlice({
  name: "karbaranApp/karbar",
  initialState: null,
  reducers: {
    newKarbar: (state, action) => KarbarModel(),
    resetKarbar: () => null,
  },
  extraReducers: {
    [getKarbar.pending]: (state, action) => null,
    [getKarbar.fulfilled]: (state, action) => action.payload,
    [updateKarbar.fulfilled]: (state, action) => action.payload,
    [removeKarbar.fulfilled]: (state, action) => null,
  },
});

export const { resetKarbar, newKarbar } = karbarSlice.actions;

export default karbarSlice.reducer;
