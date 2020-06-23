const getProfile = (req, res, db) => {
    const {name} = req.params;
    let found = false;
    db.select('*').from('users').where({name}).increment('entries', 1).then(user => {
        if(user.length) {
            res.json(user[0]);
        }
        else {
            res.status(400).send("Error Retrieving User");
        }
    })
    .catch(err => {
        res.status(400).send("Error Retrieving User");
    });
}

module.exports = {
    getProfile : getProfile
};