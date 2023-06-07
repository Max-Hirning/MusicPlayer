import SongsList from "./SongsList";
import { View, Button } from "react-native";
import SortTypesList from "./SortTypesList";
import React, { ReactElement, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetSongsList } from "../../controllers/hooks/useSetSongsList";

export default function Main(): ReactElement {
	const setSongsList = useSetSongsList();

	useEffect(() => {
		setSongsList();
	}, [setSongsList]);

	return (
		<View>
			<SortTypesList/>
			<Button title="reset" onPress={() => AsyncStorage.removeItem("songs")} />
			<SongsList/>
		</View>
	);
}
