import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import fetch from 'fetch';
import {inject as service} from '@ember/service';

export default class AiContentRoute extends AuthenticatedRoute {
    @service router;
    @service feature;
    @service settings;

    modelName = 'ai-content-post';

    async model() {
        await this.settings.fetch();
        
        // Check if jacktrade API key is configured
        if (!this.settings.jacktrade_api_key) {
            return {
                needsSetup: true,
                message: 'Please configure your Jacktrade API key in settings to use AI content features.'
            };
        }

        try {
            const url = 'http://localhost:8000/api/v1/content/conversations/68246c39f58e1935c0f009b3/threads';
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
            return {
                needsSetup: false,
                error: error.message
            };
        }
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.set('needsSetup', model.needsSetup);
        controller.set('error', model.error);
        controller.set('data', model.data);
    }
}
