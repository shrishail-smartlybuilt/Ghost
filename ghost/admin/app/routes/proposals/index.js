import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default class ProposalsIndexRoute extends AuthenticatedRoute {
    model() {
        // fetch proposals here
        // Replace this with an actual API call
        return [
            {id: 1, title: 'Proposal A'},
            {id: 2, title: 'Proposal B'}
        ];
    }
}
