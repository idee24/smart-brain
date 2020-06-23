const handleRegister = (req, res, db, bcrypt) => {
    const {id, name, password, entries} = req.body;

    if (!name || !password) { return res.status(400).json("Invalid Entries: Cammot Register"); }

    const hash = bcrypt.hashSync(password);
    const joined = new Date();

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: name
        })
        .into('login').returning('email').then(loginName => {
            return trx('users').returning('*').insert({
                email: id,
                name: loginName[0],
                joined: new Date()
            }).then(response => {
                res.json(response[0]);
            })
            .catch(err => {
                res.status(400).json(err);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => { res.status(400).json('Unable to Resister User'); });
}

module.exports = {
    handleRegister: handleRegister
};