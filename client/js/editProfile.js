/**
 * Created by AYOUB on 1/3/2016.
 */

Template.editProfile.events({
    'click #edit-profile-btn': function () {
        user = Meteor.user();
        if (user) {
            Meteor.users.update({_id: user._id}, {
                $set: {
                    'profile.firstName' : $('#first-name').val(),
                    'profile.lastName' : $('#last-name').val()
                }
            })
            Materialize.toast('Profile Successfully Edited', 4000, 'rounded');
        }
    },
    'click #add-picture-btn': function () {
        MeteorCamera.getPicture({
                width: 300,
                quality: 80
            },
            function (er, data) {
            if(er){
            }
                Meteor.users.update({_id: Meteor.user()._id}, {
                    $set: {
                        'profile.picture' : data,
                    }
                })
            }
        )
    }
});