import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ISongsGroupList {
	data: ISong[];
	isSongChoosen: boolean,
}

const initialState: ISongsGroupList = {
	data: [],
	isSongChoosen: false,
};

const songsGroupListSlice = createSlice({
	reducers: {},
	initialState,
	name: "songsGroupList",
	extraReducers: (builder) => {
		builder.addCase(setSongsGroupListAsync.pending, (): ISongsGroupList => {
			return initialState;
		});
		builder.addCase(setSongsGroupListAsync.rejected, (): ISongsGroupList => {
			return initialState;
		});
		builder.addCase(setSongsGroupListAsync.fulfilled, (state: ISongsGroupList, { payload }: PayloadAction<ISong[]>): ISongsGroupList => {
			state.data = payload;
			return state;
		});
	},
});

export default songsGroupListSlice.reducer;

export const setSongsGroupListAsync = createAsyncThunk("songsGroupList/setSongsGroupList", async (payload: ISong[]): Promise<ISong[]> => {
	await setTracks(payload);
	return payload;
});
