exports.fetchTest = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '1'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest2 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '2'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest3 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '3'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest4 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '4'});
    // return res.status(400).json({ id: '400', message: 'error'});
}