const models = require('../../models');
/** @type {import('@tryghost/api-framework').Controller} */
const controller = {
    docName: 'ai_content_posts',

    add(frame) {
        const user = frame.user;
        if(user) {
            frame.data.ai_content_posts[0].updated_by = frame.data.ai_content_posts[0].created_by = user.id;
            frame.data.ai_content_posts[0].updated_by_info = frame.data.ai_content_posts[0].created_by_info = user;
        } else {
            frame.data.ai_content_posts[0].updated_by = frame.data.ai_content_posts[0].created_by = "user";
            frame.data.ai_content_posts[0].updated_by_info = frame.data.ai_content_posts[0].created_by_info = "user";
        }
        return models.AIContentPost.add(frame.data.ai_content_posts[0], frame.options);

    },
    browse(frame) {
        return models.AIContentPost.getAllPosts(frame.options).then((posts) => {
            return {
                "ai_content_posts": posts
            };
        });
    },
    getSinglePost(frame) {
        return models.AIContentPost.getSinglePost(frame.original.params.id).then((post) => {
            return {
                "ai-content-posts": post
            }
        })
    },
    destroy(frame) {
        try {
            const id = frame.original.query.id;

            if (!id) {
                return console.error({ error: 'ID is required to delete a post.' });
            }

            return models.AIContentPost.destroy({ id: id });
        } catch (err) {
            console.error(err);
        }
    },
    edit(frame) {
        return models.AIContentPost.edit(frame.data.ai_content_posts[0], frame.options, frame.original.params.id);
    }
};

module.exports = controller;