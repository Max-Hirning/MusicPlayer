import { View } from "react-native";
import SongsList from "./SongsList";
import React, { ReactElement } from "react";
import SortTypesList from "./SortTypesList";

export default function Main(): ReactElement {
	return (
		<View>
			<SortTypesList/>
			<SongsList/>
		</View>
	);
}
