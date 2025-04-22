import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class AIContentPostsAdapter extends ApplicationAdapter {
    buildURL(...args) {
        // Call the parent class method to get the base URL
        let url = super.buildURL(...args);

        // Replace underscores with dashes in the URL path
        url = url.replace('ai_content_posts', 'ai-content-posts');

        return url;
    }
}
