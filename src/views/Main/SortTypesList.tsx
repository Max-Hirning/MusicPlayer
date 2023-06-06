import React, { ReactElement } from "react";
import { styles } from "../../models/theme/styles";
import { sortsTypes } from "../../models/sortsTypes";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { lightTheme } from "../../models/theme/theme";

export default function SortTypesList(): ReactElement {
	return (
		<FlatList
			className="mt-2"
			data={sortsTypes}
			horizontal={true}
			renderItem={({ item }: { item: string }): ReactElement => {
				return (
					<TouchableOpacity className="mx-3">
						<Text
							className="text-base"
							style={[styles.fontFamilyText, {color: lightTheme.text}]}
						>{item}</Text>
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: string, index: number): string => index.toString()}
		/>
	);
}
