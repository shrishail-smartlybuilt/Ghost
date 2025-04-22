import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import RSVP from 'rsvp';
import {action} from '@ember/object';
import {assign} from '@ember/polyfills';
import {isBlank} from '@ember/utils';
import {inject as service} from '@ember/service';

export default class PostsRoute extends AuthenticatedRoute {
    // @service infinity;
    @service router;
    @service feature;

    modelName = 'ai-content-post';

    constructor() {
        super(...arguments);
    }

    model() {
        return [];
        // return this.store.query('ai-content-post', { limit: 'all' })
        // .then(response => {
        //     return response;
        // })
        // .catch(error => {
        //     console.error('Error fetching ai-content-post:', error);
        //     return []; // In case of an error, return an empty array
        // });
    }

   
}
