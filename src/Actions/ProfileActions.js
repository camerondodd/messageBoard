import {profile} from '../firebase';

export const createProfile = (id, username, email) =>
	profile.ref(`username/${id}`).set({
		username,
		email
	});
export const onceGetProfiles = () =>
	profile.ref('username').once('value');