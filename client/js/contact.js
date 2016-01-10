/**
 * Created by AYOUB on 1/6/2016.
 */
Messages = new Mongo.Collection('messages');

MessagesPages = new Meteor.Pagination(Messages, {
    itemTemplate: "message",
    sort: {sentAt: -1}
});
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
Template.contact.events({
    'click #send-email-btn': function () {
        var email = $('#email').val();
        var message = $('#message').val();
        if (!validateEmail(email)) {
            Materialize.toast('Invalid Email Format', 4000, 'rounded');
            return;
        }
        if (email != '' && message != '') {
            //Meteor.call('addMessage', email, message);
            Messages.insert({
                author: Meteor.userId(),
                email: email,
                message: message,
                sentAt: Date.now(),
            })
            Materialize.toast('Message Successfully Sent to Admin', 4000, 'rounded');
            $('#email').val('');
            $('#message').val('');
        } else {
            Materialize.toast('Please fill all the fields', 4000, 'rounded');
        }
    }
});
Template.message.events({
    'click .remove-message': function (evt) {
        //Meteor.call('removeMessage', evt.target.id);
        Messages.remove({
            _id: evt.target.id
        })
        Materialize.toast('Message Successfully Removed', 2000, 'rounded');
    }
});