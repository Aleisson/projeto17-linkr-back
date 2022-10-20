import { STATUS_CODE } from '../enums/statusCode.Enum.js';


function notImplemented(res) {

    return res.sendStatus(STATUS_CODE.NOT_IMPLEMENTED);
}

function notFound(res) {

    return res.sendStatus(STATUS_CODE.NOT_FOUND);
}

function serverError(res, error) {
    console.error(error);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
}


export { 
    notImplemented,
    notFound,
    serverError
 };
