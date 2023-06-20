import { song } from "../../models/redux/song";
import { ISong } from "../../types/redux/song";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IActiveSong {
    data: ISong;
    exists: boolean;
}

const initialState: IActiveSong = {
	data: song,
	exists: false,
};

export const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		resetSong: (): IActiveSong => {
			return initialState;
		},
		setSong: (state: IActiveSong, { payload }: PayloadAction<ISong>): IActiveSong => {
			if (payload) {
				state.data = payload;
				state.exists = true;
			}
			return state;
		},
	},
});

export const { setSong, resetSong } = songSlice.actions;

export default songSlice.reducer;
