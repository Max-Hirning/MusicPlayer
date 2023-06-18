import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const likedSongsSlice = createSlice({
	name: "likedSongs",
	initialState,
	reducers: {
		setLikedSongs: (_: string[], { payload }: PayloadAction<string[]>): string[] => {
			return payload;
		},
		addLikedSong: (state: string[], { payload }: PayloadAction<string>): string[] => {
			state.push(payload);
			return state;
		},
		removeLikedSong: (state: string[], { payload }: PayloadAction<number>): string[] => {
			state.splice(payload, 1);
			return state;
		},
	},
});

export const { setLikedSongs, addLikedSong, removeLikedSong } = likedSongsSlice.actions;

export default likedSongsSlice.reducer;
