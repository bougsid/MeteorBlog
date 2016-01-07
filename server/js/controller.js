/**
 * Created by AYOUB on 1/2/2016.
 */

Meteor.methods({
    "userExists": function(username){
        return !!Meteor.users.findOne({username: username});
    },
});