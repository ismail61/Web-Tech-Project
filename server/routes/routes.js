
function routes(app, db) {

    app.post('/signup', (req, res) => {
        const { email, password } = req.body
        console.log(req.body)
        db.query("INSERT into users values(?,?,?)", [null, email, password],
            (err, result) => {

                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                }
                const size = Object.keys(result).length

                if (result != 0) {
                    db.query("SELECT id from users WHERE email=? and password=?", [email, password], (error, id) => {
                        console.log(id[0].id)
                        db.query("INSERT into info values(?,?,?,?,?)", ["", "", "", 0, id[0].id])
                    })

                    res.status(200).json(result);
                } else {
                    res.send({
                        err: "Server Error"
                    })
                }
            }
        )
    })
    app.get('/login', (req, res) => {

        if (req.session.user) {
            res.json({
                isLogged: true,
                user: req.session.user
            })
        } else {
            res.json({
                isLogged: false,
            })
        }
    })
    app.post('/login', (req, res) => {
        const { email, password } = req.body
        db.query("Select * from users where email = ? and password = ?", [email, password],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                }
                const size = Object.keys(result).length

                if (result != 0) {
                    req.session.user = result
                    //console.log(req.session.user)

                    res.status(200).json(result);
                } else {
                    res.send({
                        message: "Wrong Email/Password"
                    })
                }
            }
        )
    })

    app.post('/addnote/:id', (req, res) => {
        const { title, content } = req.body
        const { id } = req.params
        console.log(id)
        db.query("INSERT into notes values(?,?,?,?,?,?,?)",
            [null, title, content, new Date().toLocaleTimeString(), new Date().toLocaleTimeString(), 0, id],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                }
                const size = Object.keys(result).length
                if (result != 0) {
                    db.query("INSERT into oldnotes values(?,?,?,?,?,?,?)",
                        ["", "", "", "", 0, id, result.insertId], (error, response) => {
                            if (error) {
                                res.send({
                                    err: "Something went wrong"
                                })
                            }
                            res.status(200).json(result);
                        }
                    )

                } else {
                    res.send({
                        err: "Something went wrong"
                    })
                }
            }
        )
    })
    app.get('/notes', (req, res) => {

        db.query("SELECT * FROM notes",
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.get('/account/:email', (req, res) => {
        const { email } = req.params
        db.query("SELECT * FROM users WHERE email = ?", [email],
            (err, result) => {
                console.log(err)
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.get('/account/info/:id', (req, res) => {
        const { id } = req.params
        db.query("SELECT * FROM info WHERE userId = ?", [id],
            (err, result) => {
                console.log(err)
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.delete('/notes/:id', (req, res) => {
        db.query("DELETE FROM notes WHERE id = ?", [req.params.id],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.put('/notes/:id', (req, res) => {
        const { title, content, loginStatus } = req.body
        const { id } = req.params
        console.log(loginStatus)
        console.log(id)
        db.query("SELECT * from notes where id=? and userId=?", [id, loginStatus], (error, response) => {
            if (error) {
                res.json({
                    err: "Server Error"
                })
            }
            db.query("UPDATE notes SET title=?,content=?,updatedAt=? WHERE id = ?", [title, content, new Date().toLocaleTimeString(), id],
                (err, result) => {
                    if (err) {
                        res.json({
                            err: "Server Error"
                        })
                    } else {
                        console.log(response[0].title)
                        db.query("UPDATE oldnotes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE noteId = ? and userId=?",
                            [response[0].title, response[0].content,
                            response[0].createdAt, response[0].updatedAt,
                            response[0].is_done, id, loginStatus],
                            (error, response) => {
                                if (error) {

                                    res.json({
                                        err: "Server Error"
                                    })
                                }
                                res.json(result)
                            }
                        )
                    }
                }
            )

        })

    })
    app.put('/accountUpdate/:id', (req, res) => {
        const { name, address, state, zip } = req.body
        const { id } = req.params
        //console.log(req.body)
        console.log(id)
        db.query(
            "UPDATE info SET name=?,address=?,state=?,zip=? WHERE userId = ?", [name, address, state, zip, id],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.put('/notes/done/:id', (req, res) => {
        const { id } = req.params
        const { userId } = req.body
        db.query(
            "UPDATE notes SET is_done=? WHERE id = ?", [1, id],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    res.json(result)
                }
            }
        )
    })
    app.put('/notes/undo/:id', (req, res) => {
        const { userId } = req.body
        const { id } = req.params
        db.query("SELECT * from notes where id=? and userId=?", [id, userId], (error1, note1) => {
            if (error1) {
                res.json({
                    err: "Server Error"
                })
            }
            console.log(note1[0].title)
            db.query("SELECT * from oldnotes where noteId=? and userId=?", [id, userId], (error2, note2) => {
                if (error2) {
                    res.json({
                        err: "Server Error"
                    })
                }
                console.log(note2[0].title)
                db.query("UPDATE notes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE id = ?",
                    [note2[0].title, note2[0].content,
                    note2[0].createdAt, note2[0].updatedAt,
                    note2[0].is_done, id],
                    (err, result) => {
                        if (err) {
                            res.json({
                                err: "Server Error"
                            })
                        }
                        db.query("UPDATE oldnotes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE noteId = ?",
                            [note1[0].title, note1[0].content,
                            note1[0].createdAt, note1[0].updatedAt,
                            note1[0].is_done, id],
                            (error, response) => {
                                if (error) {

                                    res.json({
                                        err: "Server Error"
                                    })
                                }
                                res.json(result)
                            }
                        )

                    }
                )
            })
        })
    })
}

module.exports = routes