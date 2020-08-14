//firebase variables
var fAuth = firebase.auth();
var database = firebase.database();



//check user login status
fAuth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("logged In");

        /* if (user.emailVerified) {
             // User is signed in.
            */
    }
});


//login authority
function login() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPassword = document.getElementById("exampleInputPassword1").value;
    var Authority = document.getElementById("select_authority");
    if (userEmail.length < 4) {
        alert('Email Required');
        return;
    }
    if (userEmail.match(mailformat)) {
        if (userPassword.length < 8) {
            alert('Please enter a password.');
            return;
        } else {
            firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function () {
                database.ref('users/' +fAuth.currentUser.uid).on('value', (snap) => {
                  console.log( snap.val().authority);
                  if(snap.val().authority == Authority.value){
                      console.log("successfully Logged In");
                      alert("Successfully Logged In");
                      $('#login_modal').modal('hide')
                  }else{
                      alert("Check Your Authority and Password");
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                        console.log("sign Out");
                    }, function (error) {
                        // An error happened.
                        console.log(error)
                    });
                  }
                });

            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

        }
    } else {
        alert("You have entered an invalid email address!");
        return;
    }
}

//show password of login tab
function nav_login_showPassword() {
    var y = document.getElementById("login_check");
    var x = document.getElementById("login_password");
    if (x.type === "password") {
        x.type = "text";
        y.checked = true;

    } else {
        x.type = "password";
        y.checked = false;


    }
}

function log_out() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("sign Out");
    }, function (error) {
        // An error happened.
        console.log(error)
    });
}