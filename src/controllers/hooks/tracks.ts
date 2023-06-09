import TrackPlayer from "react-native-track-player";
import { usePlaybackState, State } from "react-native-track-player";

export function useGetTrackStatus(): boolean {
	const status = usePlaybackState();

	if (status === State.Playing) {
		return (true);
	} else {
		return (false);
	}
}

export function useControllTrack(): (() => Promise<void>)[] {
	const playTrack = async (): Promise<void> => {
		try {
			await TrackPlayer.play();
		} catch (error) {
			console.log(error);
		}
	};

	const stopTrack = async (): Promise<void> => {
		try {
			await TrackPlayer.pause();
		} catch (error) {
			console.log(error);
		}
	};

	const nextTrack = async (): Promise<void> => {
		try {
			await TrackPlayer.skipToNext();
		} catch (error) {
			console.log(error);
		}
	};

	const previousTrack = async (): Promise<void> => {
		try {
			await TrackPlayer.skipToPrevious();
		} catch (error) {
			console.log(error);
		}
	};

	return [ playTrack, stopTrack, nextTrack, previousTrack ];
}
