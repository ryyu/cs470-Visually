
const login = (username, password) => {
	//right now the user can log in no matter what
	document.cookie = "acct=" + username;
	document.cookie = "sessId=" + "1234";
	return checkLogin2(username, password, setCookies);
}


const logout = () => {
	document.cookie = "acct=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
	document.cookie = "sessId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}
	
		
const isLoggedIn = () => {
	console.log("Checking for login");
	if(getCookie("acct") != "" && getCookie("sessId") != ""){
		console.log("The user is logged in");
		return true;
	}
	console.log("The user is not logged in");
	return false;
}
	
	
const checkLogin2 = (username, password, callback) => {
	//Right now this is hardcoded to just always let the user login
	return true;
	var url = "http://localhost:4000/users/insert/checkCredentials?user_name=jt&user_password=password";
	return fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'no-cors', // no-cors, cors, *same-origin
		headers: {
		  'Access-Control-Allow-Origin': '*',
		},
	  });
}
	
const setCookies = (responseText) => {
	console.log(responseText);
}

	
//from https://www.w3schools.com/js/js_cookies.asp
const getCookie = (cname) => {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export {login, logout, isLoggedIn, checkLogin2, setCookies, getCookie};