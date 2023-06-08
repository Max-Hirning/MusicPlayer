import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
    songsSortType: string;
}

const initialState: ISettings = {
	songsSortType: "Tracks",
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeSongsSortType: (state: ISettings, { payload }: PayloadAction<string>): ISettings => {
			state.songsSortType = payload;
			return state;
		},
	},
});

export const { changeSongsSortType } = settingsSlice.actions;

export default settingsSlice.reducer;
