const sendErrorMsg = (res, msg) => {
    if (msg === 'jwt expired') {
        res.status(401).send(msg);
    }
    else {
        res.send({
            error: msg,
        });
    }
};

module.exports = {
    sendErrorMsg,
};