import songsReducer from "./songs";
import songReducer from "./activeSong";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		song: songReducer,
		songs: songsReducer,
	},
});
