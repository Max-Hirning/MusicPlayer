import songReducer from "./song";
import songsReducer from "./songs";
import settingsReducer from "./settings";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		song: songReducer,
		songs: songsReducer,
		settings: settingsReducer,
	},
});
