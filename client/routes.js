/**
 * Created by AYOUB on 1/2/2016.
 */
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.route('/', function () {
    Pages.set({
        perPage: 4,
        itemTemplate: "post",
    })
    this.render('posts');
})

Router.route('/posts', function () {
    Pages.set({
        perPage: 10,
        itemTemplate: "liPost",
    })
    this.render('posts');
})
Router.route('/messages', function () {
    if (Meteor.user() && Meteor.user().username == 'admin')
        this.render('messages');
    else
        Router.go('/');
})

Router.route('/about', function () {
    this.render('about');
})

Router.route('/contact', function () {
    this.render('contact');
})

Router.route('/posts/add', function () {
    if (Meteor.user()) {
        this.render('add');
    }
    else {
        Router.go('/');
    }

})

Router.route('/posts/edit/:_id', function () {
    if (Meteor.user())
        this.render('add', {
            data: function () {
                return Posts.findOne({_id: this.params._id});
            }
        });
    else {
        Router.go('/');
    }

})
Router.route('/posts/entry/:_id', {
    // this template will be rendered until the subscriptions are ready

    waitOn: function () {
        return Meteor.subscribe('posts', this.params._id);
    },
    action: function () {
        CommentsPages.set({
            perPage: 4,
            sort: {
                createdAt: -1
            },
            filters: {
                "idPost": {
                    $eq: this.params._id
                }
            }
        });
        this.render('entry', {
            data: function () {
                return Posts.findOne({_id: this.params._id});
            }
        })
    }
});
//Router.route('/posts/entry/:_id', function () {

//
//    this.render('entry', {
//        data: function () {
//            return Posts.findOne({_id: this.params._id});
//        }
//    })
//})
Router.route('/editProfile', function () {
    if (Meteor.user()) {
        this.render('editProfile', {
            data: function () {
                return Meteor.user();
            }
        });
    }

    else {
        Router.go('/');
    }
})

