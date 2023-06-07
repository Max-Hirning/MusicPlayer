import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

export const checkGetPermmisionForStorageReading = async (): Promise<void> => {
	try {
		const permissionResult = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
		if (permissionResult !== RESULTS.GRANTED) {
			const permission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
			console.log(permission);
		}
	} catch (error) {
		console.log(error);
	}
};
