import RNFS from "react-native-fs";
import SongsList from "./SongsList";
import { Button, View } from "react-native";
import SortTypesList from "./SortTypesList";
import React, { ReactElement } from "react";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function Main(): ReactElement {
	const getMusicFiles = async () => {
		try {
			const permission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
			console.log(permission);
			if (permission === RESULTS.GRANTED) {
				const path = RNFS.ExternalStorageDirectoryPath;
				const files = await RNFS.readDir(`${path}/Music`);
				console.log(files);
				// const downloadedFiles = files.filter(file => file.isFile());
				// downloadedFiles.forEach(file => {
				// 	console.log(file);
				// });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<SortTypesList/>
			<Button title="dvsdv" onPress={getMusicFiles} />
			<SongsList/>
		</View>
	);
}
