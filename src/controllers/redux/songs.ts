import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: ISong[] = [];

const songsSlice = createSlice({
	reducers: {},
	initialState,
	name: "songs",
	extraReducers: (builder) => {
		builder.addCase(setSongsAsync.fulfilled, (_: ISong[], { payload }: PayloadAction<ISong[]>): ISong[] => {
			return payload;
		});
	},
});

export default songsSlice.reducer;

export const setSongsAsync = createAsyncThunk("songs/setSongs", async (payload: ISong[]): Promise<ISong[]> => {
	await setTracks(payload);
	return payload;
});
