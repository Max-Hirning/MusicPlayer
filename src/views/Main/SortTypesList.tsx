import React, { ReactElement } from "react";
import { styles } from "../../models/theme/styles";
import { sortsTypes } from "../../models/sortsTypes";
import { lightTheme } from "../../models/theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { AppDispatch, RootState } from "../../types/redux/store";
import { ISettings, changeSongsSortType } from "../../controllers/redux/settings";

export default function SortTypesList(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { songsSortType }: ISettings = useSelector((state: RootState) => state.settings);

	const chooseSortType = (type: string) => (): void => {
		dispatch(changeSongsSortType(type));
	};

	return (
		<FlatList
			className="mt-2"
			data={sortsTypes}
			horizontal={true}
			renderItem={({ item }: { item: string }): ReactElement => {
				return (
					<TouchableOpacity
						className="mx-3"
						onPress={chooseSortType(item)}
					>
						<Text
							className="text-base"
							style={[(item.toLowerCase() === songsSortType.toLowerCase()) ? styles.fontFamilyBoldText : styles.fontFamilyText, {color: lightTheme.text}]}
						>{item}</Text>
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: string, index: number): string => index.toString()}
		/>
	);
}
