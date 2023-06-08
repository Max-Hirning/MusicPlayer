// import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import { lightTheme } from "../../models/theme/theme";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../controllers/redux/song";
import { AppDispatch, RootState } from "../../types/redux/store";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

export default function SongsList(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const songs: ISong[] = useSelector((state: RootState) => state.songs);

	const getText = (text: string): string => {
		if (text.length >= 25) {
			return `${text.slice(0, 25)}...`;
		}
		return text;
	};

	const chooseSong = (song: ISong) => (): void => {
		dispatch(setSong(song));
	};

	return (
		<FlatList
			data={songs}
			className="mt-4 mb-28"
			renderItem={({ item }: { item: ISong }): ReactElement => {
				return (
					<TouchableOpacity
						onPress={chooseSong(item)}
						className="flex flex-row items-center mx-6 my-3 justify-between"
					>
						<View className="flex flex-row items-center">
							<Image
								className="w-14 h-14 rounded-xl"
								source={{uri: item.artwork}}
							/>
							<View className="ml-3">
								<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(item.title)}</Text>
								{(item.album.length !== 0) && <Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(item.album)}</Text>}
							</View>
						</View>
						{/* <SoundIcon
								width={28}
								height={28}
								color={lightTheme.icon}
							/> */}
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: ISong, index: number): string => index.toString()}
		/>
	);
}
