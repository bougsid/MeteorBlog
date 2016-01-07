/**
 * Created by AYOUB on 1/2/2016.
 */
Template.registerHelper('getUrl', function(image){
        return window.location.origin+Images.findOne(image._id).url();
    }
);

Posts = new Mongo.Collection('posts');

Pages = new Meteor.Pagination(Posts, {
    itemTemplate: "post",
    sort: {createdAt: -1}
});
Meteor.subscribe('images');

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/images"})]
});


Template.posts.events({
    'click #add-post-btn': function () {
        Router.go('/posts/add');
    }
});
Template.post.helpers({
    'subContent': function (content) {
        if (content.length > 200)
            return content.substr(0, 200)+'...';
        else return content+'...';
    }
});