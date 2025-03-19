import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import config from './ModuleNameConfig';
import { ModuleNameStateType, SomeActionPayloadType } from '@sdk';

const initialState: ModuleNameStateType = {
  someState: ''
};

export const moduleNameSlice = createSlice({
  name: config.sliceName,
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<SomeActionPayloadType>) {
      state.someState = action.payload.code;
    },
  }
});

/*

Uncomment the following line to enable persisting the slice state

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {SlicePersistConfig} from '@sdk';
const persistConfig: SlicePersistConfig<typeof moduleNameSlice> = {
  key: config.sliceName,
  storage,
  whitelist: config.slicePersist?.whitelist || [],
  version: 1
};

const reducer = persistReducer(persistConfig, moduleNameSlice.reducer)

*/
const reducer = moduleNameSlice.reducer;
export default reducer;