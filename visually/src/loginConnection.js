export default class LoginConnection {
	login = (username, password) => {
		document.cookie = "acct=" + username;
		document.cookie = "sessId=" + "1234";
		console.log(document.cookie);
		console.log("Hey there");
		return true;
	}
}