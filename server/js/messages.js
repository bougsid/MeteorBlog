/**
 * Created by AYOUB on 1/6/2016.
 */
Messages = new Mongo.Collection('messages');
Messages.allow({
    'insert' : function () {
        if(Meteor.user())
            return true;
    },
    'remove' : function () {
        if(Meteor.user())
            return true;
    },
})

MessagesPages = new Meteor.Pagination(Messages, {
    sort: {sentAt: -1},
    perPage: 4,
    availableSettings: {
        pageTemplate: true,
        perPage: true,
        sort: true,
        itemTemplate: true,
    }
});

//Meteor.methods({
//    addMessage: function (email, message) {
//        if (Meteor.user() != null)
//            Messages.insert({
//                author: Meteor.userId(),
//                email: email,
//                message: message,
//                sentAt: Date.now(),
//            })
//    },
//    removeMessage: function (id) {
//        Messages.remove({
//            _id: id
//        })
//    }
//})