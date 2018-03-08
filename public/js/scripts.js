/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = ui('email').value;
        var password = ui('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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
            ui('sign-in').disabled = false;
            ui('sign-out').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    ui('sign-in').disabled = true;
    ui('sign-out').disabled = true;
}

function sendPasswordReset() {
    var email = ui('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        // [START_EXCLUDE silent]
        var loggedIn = user != null;
        $('#login-form').toggle(!loggedIn);
        $('#logout-form').toggle(loggedIn);
        $('#offering').toggle(loggedIn);
        $('#profile').toggle(!loggedIn);
        $('#verify-email').toggle(true);
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
//            ui('account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
//            ui('account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        ui('sign-in').disabled = false;
        ui('sign-out').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    ui.onClick('sign-in', toggleSignIn);
    ui.onClick('sign-out', toggleSignIn);
    ui.onClick('password-reset', sendPasswordReset);
    ui.onClick('put-offer', () => app.putOffer());
    ui.onClick('download-offers', () => app.downloadLatestOffers());
    ui.onClick('all-offers', () => app.allOffers());
    ui.onClick('latest-offers', () => app.latestOffers());
    ui.onClick('clear-offers', () => app.clearOffers());
    
    $('.mdc-text-field').each(function() {
        var id = $(this).attr("id"); mdc.textField.MDCTextField.attachTo(document.querySelector('#'+id));
    });
    $('.mdc-select').each(function() {
        var id = $(this).attr("id");
        mdc.select.MDCSelect.attachTo(document.querySelector('#'+id));
    });
    $('.mdc-ripple-upgraded').each(function() {
        var id = $(this).attr("id");
        mdc.ripple.MDCRipple.attachTo(document.querySelector('#'+id));
    });
}
window.onload = function () {
    initApp();
};
