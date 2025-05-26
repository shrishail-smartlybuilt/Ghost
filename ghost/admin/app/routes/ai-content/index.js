import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import fetch from 'fetch';
import {inject as service} from '@ember/service';

export default class PostsRoute extends AuthenticatedRoute {
    @service router;
    @service feature;

    modelName = 'ai-content-post';

    constructor() {
        super(...arguments);
    }

    async model() {
        try {
            const url = 'http://localhost:8000/api/v1/content/conversations/682dbf626ae9dec331a9f3f3/threads';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            return [];
        }
    }
}
