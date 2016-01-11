/**
 * Created by AYOUB on 1/2/2016.
 */
Template.add.events({
    'click #add-post-btn': function (evt) {
        var title = $("#title").val();
        var content = $("#content").val();
        if (title.trim() != '' && content.trim() != '') {
            file = $('.imageInput').get(0).files[0];
            var fsFile = new FS.File(file);
            image = Images.insert(fsFile, function (err, fileObj) {
                if (err) {
                    //console.error(err);
                } else {

                }
            });
            Meteor.call('addPost', title, content, image);
            Materialize.toast('Post Successfully Published', 4000, 'rounded');
            $("#title").val('');
            $("#content").val('');

        } else {
            Materialize.toast('Please fill out all the fields', 4000, 'rounded');
        }
    },
    'click .edit-post-btn': function (evt) {
        var title = $("#title").val();
        var content = $("#content").val();
        if (title.trim() != '' && content.trim() != '') {
            var id = evt.target.id;
            file = $('.imageInput').get(0).files[0];
            var image = typeof file !== 'undefined';
            //console.log(image);
            if (image) {
                var fsFile = new FS.File(file);
                image = Images.insert(fsFile, function (err, fileObj) {
                    if (err) {
                        //console.error(err);
                    } else {

                    }
                });
            }
            Meteor.call('editPost',evt.target.id, title, content, image);
            Materialize.toast('Post Successfully Modified', 4000, 'rounded');
        } else {
            Materialize.toast('Please fill out all the fields', 4000, 'rounded');
        }
    }
});

Template.add.helpers({
    images: function () {
        return Images.find();
    }
});

Template.liPost.events({
    'click .remove-post': function (evt) {
        Meteor.call('removePost', evt.target.id);
        Materialize.toast('Post Successfully Removed', 2000, 'rounded');
    }
});
