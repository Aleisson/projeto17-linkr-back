import * as helper from './controlers.Helper.js';
import * as repository from '../repositories/update.Reposity.js';

async function updatePost(req, res) {

    const { id: userId } = res.locals.user[0];
    const content = res.locals.content;
    const id = res.locals.id;

    try {

        const response = await repository.updatePost(id, userId, content);

        if (response.rowCount) {
            return helper.okResponse(res);
        }

        return helper.badRequest(res);


    } catch (error) {
        return helper.serverError(res, error);
    }
}

export { updatePost }