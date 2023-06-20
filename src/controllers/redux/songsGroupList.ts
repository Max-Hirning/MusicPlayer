import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: ISong[] = [];

const songsGroupListSlice = createSlice({
	reducers: {},
	initialState,
	name: "songsGroupList",
	extraReducers: (builder) => {
		builder.addCase(setSongsGroupListAsync.fulfilled, (_: ISong[], { payload }: PayloadAction<ISong[]>): ISong[] => {
			return payload;
		});
	},
});

export default songsGroupListSlice.reducer;

export const setSongsGroupListAsync = createAsyncThunk("songsGroupList/setSongsGroupList", async (payload: ISong[]): Promise<ISong[]> => {
	await setTracks(payload);
	return payload;
});
