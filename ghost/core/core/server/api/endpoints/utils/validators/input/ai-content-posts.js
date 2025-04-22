const jsonSchema = require('../utils/json-schema');

module.exports = {
    async add() {
        await jsonSchema.validate(...arguments);
    },
    async edit() {
        await jsonSchema.validate(...arguments);
    }
};
