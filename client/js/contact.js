/**
 * Created by AYOUB on 1/6/2016.
 */
Messages = new Mongo.Collection('messages');

MessagesPages = new Meteor.Pagination(Messages,{
    itemTemplate: "message",
    sort: {createdAt: -1}
});

Template.contact.events({
    'click #send-email-btn' : function(){
            var email = $('#email').val();
            var message = $('#message').val();
            if(email !='' && message != ''){
                Meteor.call('addMessage', email, message);
                Materialize.toast('Message Successfully Sent to Admin', 4000, 'rounded');
                $('#email').val('');
                $('#message').val('');
            }else{
                Materialize.toast('Please fill all the fields', 4000, 'rounded');
            }
    }
});
Template.message.events({
    'click .remove-message': function (evt) {
        Meteor.call('removeMessage', evt.target.id);
        Materialize.toast('Message Successfully Removed', 2000, 'rounded');
    }
});