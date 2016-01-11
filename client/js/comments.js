Comments = new Mongo.Collection('comments');
//Meteor.subscribe('comments',{limit:4});

CommentsPages = new Meteor.Pagination(Comments,{
    perPage: 4,
    itemTemplate: "comment",
    sort: {createdAt: -1}
});

Template.entry.events({
    'click .add-comment-btn': function (evt) {
        var comment = $("#comment-content").val();
        if(Meteor.user())
        if(comment.trim() != ''){
            Meteor.call('addComment',evt.target.id, $("#comment-content").val());
            $("#comment-content").val('');
            Materialize.toast('Comment Successfully Added', 4000, 'rounded');
        }else{
            Materialize.toast('Please write a comment', 4000, 'rounded');
        }
        else{
            Materialize.toast('Please Login', 4000, 'rounded');
        }
    },
    'click .remove-comment-btn': function (evt) {
        Meteor.call('removeComment', evt.target.id);
        Materialize.toast('Comment Successfully Removed', 2000, 'rounded');
    }
});
