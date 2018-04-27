
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
	
	
const checkLogin2 = (username, password) => {

	var url = "http://localhost:4000/users/insert/checkCredentials?user_name=" + username + "&user_password=" + password;
	fetch(url, {mode: 'cors'})
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return false;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
		return true;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
	return false;
  });
  console.log("We hit the bottom");
}

const checkLoginFetch = (username, password, url) => {
	return fetch(url, {mode: 'cors'});
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