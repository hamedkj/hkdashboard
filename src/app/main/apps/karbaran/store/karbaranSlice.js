import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { addKarbar, removeKarbar, updateKarbar } from './karbarSlice';

export const getKarbaran = createAsyncThunk(
  'karbaranApp/karbaran/getKarbaran',
  async (params, { getState }) => {
    const response = await axios.get('/api/kar');

    const data = await response.data;

    return { data };
  }
);

const karbaranAdapter = createEntityAdapter({});

export const selectSearchText = ({ karbaranApp }) => karbaranApp.karbaran.searchText;

export const { selectAll: selectKarabaran, selectById: selectKarbaranById } =
  karbaranAdapter.getSelectors((state) => state.karbaranApp.karbaran);

export const selectFilteredKarbaran = createSelector(
  [selectKarabaran, selectSearchText],
  (karbaran, searchText) => {
    if (searchText.length === 0) {
      return karbaran;
    }
    return FuseUtils.filterArrayByString(karbaran, searchText);
  }
);

export const selectGroupedFilteredKarbaran = createSelector(
  [selectFilteredKarbaran],
  (karbaran) => {
    return karbaran
      .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
      .reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
      }, {});
  }
);

const karbaranSlice = createSlice({
  name: 'karbaranApp/karbaran',
  initialState: karbaranAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setKarbaranSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [updateKarbar.fulfilled]: karbaranAdapter.upsertOne,
    [addKarbar.fulfilled]: karbaranAdapter.addOne,
    [removeKarbar.fulfilled]: (state, action) => karbaranAdapter.removeOne(state, action.payload),
    [getKarbaran.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      karbaranAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setKarbaranSearchText } = karbaranSlice.actions;

export default karbaranSlice.reducer;
