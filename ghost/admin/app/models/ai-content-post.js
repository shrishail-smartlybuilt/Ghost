import Model, {attr, belongsTo} from '@ember-data/model';

export default class AiContentPostModel extends Model {
    @attr('string') html;

    @attr('date') createdAt;
    @attr('string') createdBy;

    @attr('date') updatedAt;
    @attr('string') updatedBy;

    @belongsTo('post') post;
}
