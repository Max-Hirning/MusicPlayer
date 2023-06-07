import { ISong } from "../../types/redux/song";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ISong[] = [];

export const songsSlice = createSlice({
	name: "songs",
	initialState,
	reducers: {
		setSongs: (_: ISong[], { payload }: PayloadAction<ISong[]>): ISong[] => {
			return payload;
		},
	},
});

export const { setSongs } = songsSlice.actions;

export default songsSlice.reducer;
