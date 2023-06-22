import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../models/theme/theme";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
	appTheme: string;
	songsSortType: string;
	isPlayerSetted: boolean;
}

const initialState: ISettings = {
	appTheme: themes[0],
	isPlayerSetted: false,
	songsSortType: "Tracks",
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
		setSettings: (state: ISettings, { payload }: PayloadAction<ISettings|null>): ISettings => {
			if (payload) {
				state.appTheme = payload.appTheme;
				state.songsSortType = payload.songsSortType;
			}
			return state;
		},
		changePlayerSettedStatus: (state: ISettings, { payload }: PayloadAction<boolean>): ISettings => {
			state.isPlayerSetted = payload;
			return state;
		},
	},
});

export const { changeAppTheme, changeSongsSortType, setSettings, changePlayerSettedStatus } = settingsSlice.actions;

export default settingsSlice.reducer;
