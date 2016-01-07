/**
 * Created by AYOUB on 1/2/2016.
 */
AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
//Methods
    onSubmitHook: function(error, state){
        if (!error) {
            if (state === "signIn") {
                // Successfully logged in
                $('#login-btn').html('Logout');
                hidepopup();
            }
            if (state === "signUp") {
                // Successfully registered
                $('#login-btn').html('Logout');
                hidepopup();
            }
        }
    },
    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "error.accounts.Username or Password invalid",
            mustBeLoggedIn: "error.accounts.Must be logged in",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        },
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});
AccountsTemplates.addField({
    errStr : 'That username already exists. Please try another',
    _id: 'username',
    type: 'text',
                    required: true,
                        func: function(value){
                    if (Meteor.isClient) {
                        var self = this;
                        Meteor.call("userExists", value, function(err, userExists){
                            if (!userExists)
                                self.setSuccess();
                            else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});


function hidepopup() {
    $(".login-dialog").fadeOut("slow",function() {
        $(".login-dialog").css({"visibility": "hidden", "display": "none"});
        $(".at-form").css({"display": "none"});
    });
}