import { addTracks } from "../trackPlayer";
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
		changeSong: (state: ISong[], { payload }: PayloadAction<ISong>): ISong[] => {
			const EditSongId = state.findIndex((el: ISong) => el.url === payload.url);
			state[EditSongId] = payload;
			addTracks(state);
			return state;
		},
	},
});

export const { setSongs, changeSong } = songsSlice.actions;

export default songsSlice.reducer;
