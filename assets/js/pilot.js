$(".bname").html("United Arab Bank");
$(".copyright").html("2025 United Arab Bank | All right reserved.");
$(".bphone").html("+971-525-985679");
$(".bphone2").html("+971-525-985679");
$(".bemail").html("info@unitedarabb.com");
$(".bwebsite").html("www.unitedarabb.com");  
$(".baddress").html("15/340, Jebel Ali Free Zone, Dubai, United Arab Emirates."); 
$(".bcountry").html("U.A.E."); 
$(".bswift").html("UNARBMMXXX"); 
$(".blogo_png").attr("src","../../assets/img/first-st-logo.png");
$(".blogo_secure_png").attr("src","../../assets/img/first-st-logo.png");
$(".blogo_png2").attr("src","../../assets/img/first-st-logo.png");
$(".logo_ico").attr("src","../../assets/img/first-st-logo.png");
 
 
var baseUrl = "https://unitedarabb.com/";
var baseApiUrl = "https://indoramaventures.org/api/unitedarabb/";
	
//Get IPaddress
$.getJSON("https://api.ipify.org?format=json", function(data) { 
			$(".ipaddress").html(data.ip); 
		})

//Get url params
const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const service = urlParams.get('util'); 
$(".service").html(service); 
let totalAmt = 0;


// Function to set a cookie
function setCookie(name, value, days) {
		  let expires = "";
		  if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		  }
		  document.cookie = name + "=" + (value || "") + expires + "; path=/";
		}

// Function to get a cookie
function getCookie(name) {
		  const nameEQ = name + "=";
		  const ca = document.cookie.split(';');
		  for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
			  c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
			  return c.substring(nameEQ.length, c.length);
			}
		  }
		  return null;
		}

// Function to erase a cookie
function eraseCookie(name) {
				document.cookie = name+'=; Max-Age=-99999999; path=/;';
			}

// Example usage: setting a cookie
//setCookie("user_id", "12345", 7); // Sets a cookie named "user_id" with value "12345" for 7 days

// Example usage: checking for a cookie on all pages
/*
document.addEventListener('DOMContentLoaded', () => { // ensures the DOM is fully loaded.
  const userId = getCookie("user_id");

  if (userId) {
    console.log("Cookie 'user_id' found: " + userId);
    // Use the cookie value as needed (e.g., fetch user data from server)
    // Example: show the logged in user's profile icon.
  } else {
    console.log("Cookie 'user_id' not found.");
      // Example : hide user profile icon, or redirect to login page.
  }

});
*/

//Example to remove a cookie
//eraseCookie("user_id");




document.addEventListener('DOMContentLoaded', () => { // ensures the DOM is fully loaded.
  const sessionId = getCookie("sessionId");

    console.log("Cookie found: " + sessionId);
	
  if (sessionId) {
    // Use the cookie value as needed (e.g., fetch user data from server)
    // Example: show the logged in user's profile icon. 
	$.ajax({
		dataType: 'JSON',
		url: baseApiUrl+"sessionid",
		data: { "sessionId": sessionId}, 
		type: 'POST',
		cache:true,
		success: function(response) {
	 	console.log("No response " + response);  
		
		
		if(response.responseCode == "100"){ 
			if(response.account.acc_username != undefined ){$(".acc_username").html(response.account.acc_username); }
		$(".acc_email").html(response.account.acc_email);
		$(".acc_name").html(response.account.acc_name);
		$(".acc_num").html(response.account.acc_num);
		$(".acc_currency").html(response.account.acc_currency);
		$(".acc_phone").html(response.account.acc_phone);
		$(".acc_address").html(response.account.acc_address);
		$(".acc_country").html(response.account.acc_country);
		let dom_balance = parseInt(response.account.dom_balance);
		let msme_balance = parseInt(response.account.msme_balance);
		dom_balance = dom_balance.toLocaleString();
		msme_balance = msme_balance.toLocaleString();
		$(".dom_balance").html(dom_balance);
		$(".msme_balance").html(msme_balance);
		let totalAmt = parseInt(response.account.dom_balance) + parseInt(response.account.msme_balance);
		totalAmt = totalAmt.toLocaleString() ;
		$(".totalAmt").html(totalAmt);  

		if(response.account.acc_currency == "GBP"){ $(".cur_GBP").html(totalAmt); }
			else{ $(".cur_GBP").html("0.00");}
			 
		if(response.account.acc_currency == "USD"){ $(".cur_USD").html(totalAmt); }
			else{ $(".cur_USD").html("0.00");}
			 
		if(response.account.acc_currency == "EUR"){ $(".cur_EUR").html(totalAmt); }
			else{ $(".cur_EUR").html("0.00");}
		 } else{ 
			

		 } 
		//if 000, then session expired
		if(response.responseCode == "000" && response.sessionId == "" ){  
                   window.location.replace(response.nav); 
				 //  location.reload();
                } 
		},
		error: function(error){ 
        console.log(error); 
		}
	});
	
  } else {
    console.log("Cookie 'user_id' not found.");
      // Example : hide user profile icon, or redirect to login page.
  }

});


//let sessionId = sessionStorage.getItem("sessionId");
//	console.log(sessionStorage.getItem("sessionId")); 
 



$('#logout').on('click', function(event){  
	event.preventDefault();  
	//let sessionId = sessionStorage.getItem("sessionId");
	const sessionId = getCookie("sessionId");

	console.log(sessionId);  
	$.ajax({
		dataType: 'JSON',
		url: baseApiUrl+"logout",
		data: { "sessionId": sessionId}, 
		type: 'POST',
		cache:true,
		success: function(response) {
		console.log(response); 
		if(response.responseCode == "100" && response.sessionId != ""){  
	//Example to remove a cookie
	eraseCookie(sessionId);
			let sessionId = sessionStorage.getItem("");
                   window.location.replace(response.nav); 
				 //  location.reload();
                } else
		if(response.responseCode == "000" && response.sessionId == ""){  
                   window.location.replace(response.nav); 
				 //  location.reload();
                } 
		},
		error: function(error){ 
        console.log(error); 
		}
		});
	});
 
