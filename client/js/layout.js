/**
 * Created by AYOUB on 1/2/2016.
 */
Meteor.subscribe('users');
Template.registerHelper('formattime', function (ts) {
    return moment.duration(Date.now() - ts).humanize();
});
Template.registerHelper('getOwnerUsername', function (id) {
    return Meteor.users.findOne({_id: id}).username;
});

Template.registerHelper('getOwnerPicture', function (id) {
    return Meteor.users.findOne({_id: id}).profile.picture;
});

Template.registerHelper('isConnected', function () {
        return Meteor.user();
    }
);
Template.registerHelper('isAdmin', function () {
        return Meteor.user().username == 'admin';
    }
);
Template.registerHelper('isOwner', function (_id) {
        if (Meteor.user())
            return Meteor.userId() === _id;
        else return false;
    }
);
Template.layout.rendered = function () {
    $('#login-btn').click(function () {
        if (Meteor.user()) {
            AccountsTemplates.logout();
            Router.go('/');
        } else {
            showpopup();
        }

    });
    $('#close-dialog').click(function () {
        hidepopup();
    })
}


function showpopup() {
    $(".login-dialog").fadeIn();
    $(".login-dialog").css({"visibility": "visible", "display": "block"});
    $(".at-form").css({"display": "block"});

}

function hidepopup() {
    $(".login-dialog").fadeOut("slow", function () {
        $(".login-dialog").css({"visibility": "hidden", "display": "none"});
        $(".at-form").css({"display": "none"});
    });
}