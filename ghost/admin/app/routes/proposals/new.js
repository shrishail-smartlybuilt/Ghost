import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default class ProposalsNewRoute extends AuthenticatedRoute {
    model() {
        return {
            title: '',
            content: ''
        };
    }
}