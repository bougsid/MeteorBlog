/**
 * Created by AYOUB on 1/2/2016.
 */
Accounts.onCreateUser(function (o, user) {
    user.profile = {};
    user.profile.firstName = '';
    user.profile.lastName = '';
    user.profile.picture = '/images/default.png';
    return user;
});

Posts = new Mongo.Collection('posts');

Posts.allow({
    'insert' : function () {
        if(Meteor.user())
            return true;
    },
    'update' : function () {
        if(Meteor.user())
            return true;
    },
    'remove' : function () {
        if(Meteor.user())
            return true;
    },
})

Pages = new Meteor.Pagination(Posts, {
    sort: {createdAt: -1},
    availableSettings: {
        pageTemplate: true,
        perPage: true,
        sort: true,
        itemTemplate: true,
    }
});
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: Meteor.absolutePath + '/public/images'})],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }}
});
Meteor.publish("posts", function(id) {
    return Posts.find({_id: id})
});

Meteor.publish("images", function() {
    return Images.find();
});

Meteor.publish('users', function () {
    return Meteor.users.find({});
});



Images.allow({
    insert: function(userId, doc) {
        return true;
    },
    download: function(userId, fileObj) {
        return true;
    },
    update: function(userId, doc, fields, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});
Images.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
    },
    'update': function () {
        // add custom authentication code here
        return true;
    }
});
//Meteor.methods({
//    addPost: function (title, content, image) {
//        if (Meteor.user() != null)
//            Posts.insert({
//                author: Meteor.userId(),
//                title: title,
//                content: content,
//                image: image,
//                createdAt: Date.now(),
//                lastUpdate: Date.now(),
//            })
//    },
//    editPost: function (id, title, content, image) {
//        if (Meteor.user() != null){
//            if(image){
//                Posts.update({_id: id}, {
//                    $set: {
//                        'title': title,
//                        'content': content,
//                        'lastUpdate': Date.now(),
//                        'image' : image
//                    }
//                })
//            }else{
//                Posts.update({_id: id}, {
//                    $set: {
//                        'title': title,
//                        'content': content,
//                        'lastUpdate': Date.now(),
//                    }
//                })
//            }
//        }
//
//    },
//    removePost: function (id) {
//        Posts.remove({
//            _id: id
//        })
//    }
//})