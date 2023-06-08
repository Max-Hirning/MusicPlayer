import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../models/theme/theme";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
	appTheme: string;
    songsSortType: string;
}

const initialState: ISettings = {
	songsSortType: "Tracks",
	appTheme: themes[0].value,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeAppTheme: (state: ISettings, { payload }: PayloadAction<string>): ISettings => {
			state.appTheme = payload;
			return state;
		},
		changeSongsSortType: (state: ISettings, { payload }: PayloadAction<string>): ISettings => {
			state.songsSortType = payload;
			return state;
		},
	},
});

export const { changeAppTheme, changeSongsSortType } = settingsSlice.actions;

export default settingsSlice.reducer;
