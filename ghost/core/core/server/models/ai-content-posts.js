const ghostBookshelf = require('./base');
const crypto = require('crypto');

const AIContentPost = ghostBookshelf.Model.extend({
    tableName: 'ai_content_posts',
    idAttribute: 'id',

    defaults() {
        return {
            id: crypto.randomBytes(12).toString('hex'),
            html: null,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: null,
            updated_by: null,
            created_by_info: null,
            updated_by_info: null
        };
    }
}, {
    add(data, options = {}) {
        return this.forge(data).save(null, options);
    },

    edit(data, options = {}, id) {
        if (!id) {
            return Promise.reject(new Error('ID is required to edit a post.'));
        }

        return this.forge({ id }).fetch({ require: true })
            .then((post) => {
                return post.save(data, options);
            });
    },
    
    getAllPosts(options = {}) {
        return this.fetchAll({
            ...options,
            columns: ['*'] // Ensures all fields from the table are selected
        }).then(collection => collection.toJSON());
    },

    getSinglePost(id, options = {}) {
        return this.where({ id }).fetch({
            ...options,
            columns: ['*']
        }).then(post => {
            return post ? post.toJSON() : null;
        }).catch((error) => {
            console.error("Error fetching post:", error);
            throw error;
        });
    },

    destroy: function destroy(options = {}) {
        console.log(options);
        const id = options.id;

        if (!id) {
            return Promise.reject(new Error('ID is required to delete a post.'));
        }

        return this.forge({ id }).fetch({ require: true }).then((post) => {
            return post.destroy(options);
        });
    },
});

module.exports = {
    AIContentPost: ghostBookshelf.model('AIContentPost', AIContentPost)
};
