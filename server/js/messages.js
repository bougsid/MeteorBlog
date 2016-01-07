/**
 * Created by AYOUB on 1/6/2016.
 */
Messages = new Mongo.Collection('messages');
Pages = new Meteor.Pagination(Messages, {
    sort: {createdAt: -1},
    availableSettings: {
        pageTemplate: true,
        perPage: true,
        sort: true,
        itemTemplate: true,
    }
});

Meteor.methods({
    addMessage: function (email, message) {
        if (Meteor.user() != null)
            Messages.insert({
                author: Meteor.userId(),
                email: email,
                message: message,
                sentAt: Date.now(),
            })
    },
    removeMessage: function (id) {
        Messages.remove({
            _id: id
        })
    }
})