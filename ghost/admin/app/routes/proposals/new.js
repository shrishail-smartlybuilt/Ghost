import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default class ProposalsNewRoute extends AuthenticatedRoute {
    model() {
        return {
            title: "Let’s generate",
            content: "Enter topic that you like to generate content on."
        };
    }
}
