import SongsList from "./SongsList";
import { View } from "react-native";
import SortTypesList from "./SortTypesList";
// import { Button } from "react-native";
import React, { ReactElement } from "react";
import PlayerContainer from "../PlayerContainer";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main(): ReactElement {
	return (
		<View className="flex-1">
			<View>
				<SortTypesList/>
				{/* <Button title="reset" onPress={() => {
					AsyncStorage.removeItem("song");
					AsyncStorage.removeItem("songs");
				}} /> */}
				<SongsList/>
			</View>
			<PlayerContainer/>
		</View>
	);
}
