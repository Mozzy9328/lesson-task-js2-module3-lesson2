// Create Key Names

const tokenKey = "token";
const userKey = "user";

//Token

export function saveToken(token) {
	saveToStorage(tokenKey, token);
}

export function getToken() {
	return getFromStorage(tokenKey);
}

//USER

export function saveUser(user) {
	saveToStorage(userKey, user);
}

export function getUser() {
	const user = getFromStorage(userKey);

	if (user) {
		return user.username;
	}
	return null;
}

//LocalStorage

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
	const value = localStorage.getItem(key);

	if (!value) {
		return [];
	}
	return JSON.parse(value);
}
