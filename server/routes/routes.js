const nodemailer = require('nodemailer')
function routes(app, db) {

    app.post('/signup', (req, res) => {
        const { email, password } = req.body
        db.query("INSERT into users values(?,?,?,?)", [null, email, password, 0],
            (err, result) => {

                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                }
                const size = Object.keys(result).length

                if (result != 0) {
                    db.query("SELECT id from users WHERE email=? and password=?", [email, password], (error, id) => {
                        //console.log(id[0].id)
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
        db.query("SELECT id from users where email = ? and password = ?", [email, password],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                }

                const size = Object.keys(result).length

                if (result != 0) {
                    //req.session.user = result
                    const code = Math.floor(100000 + Math.random() * 900000);
                    db.query("UPDATE users SET code=? where id=?", [code, result[0].id], (error, r) => {
                        if (error) {
                            res.json({
                                err: "Server Error"
                            })
                        }
                        res.status(200).json(result);
                        console.log(code)
                        /* var mailOptions = {
                            from: process.env.EMAIL,
                            to: email,
                            subject: 'OTP VERIFICATION',
                            text: 'OTP : ' + code
                        };
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASSWORD
                            }
                        }); */
                        /* transporter.sendMail(mailOptions, function (er, info) {
                            if (er) {
                                res.json({
                                    err: "OTP code send Failed !"
                                })
                            }else {
                                res.status(200).json(result);
                            }
                        }); */

                    })

                } else {
                    res.send({
                        message: "Wrong Email/Password"
                    })
                }
            }
        )
    })
    app.post('/code', (req, res) => {
        const { id, otp } = req.body
        db.query("SELECT id,email,password,code from users where id=?", [id], (err, result) => {
            if (err) {
                res.json({
                    err: "Server Error"
                })
            }
            if (result[0].code == otp) {
                res.json(result[0])
            } else {
                res.json({
                    message: "OTP Doesn't Match"
                })
            }
        })
    })

    app.post('/addnote/:id', (req, res) => {
        const { title, content } = req.body
        const { id } = req.params
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
                    db.query("INSERT into oldnotes values(?,?,?,?,?,?,?,?)",
                        [null, "", "", "", "", 0, id, result.insertId], (error, response) => {
                            if (error) {
                                console.log(error)
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
    app.get('/notes/:id', (req, res) => {
        const { id } = req.params
        db.query("SELECT * FROM notes where userId = ? ORDER BY id DESC", [id],
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
    app.get('/deletenotes/:id', (req, res) => {
        const { id } = req.params
        db.query("SELECT * FROM deletenote where userId=?", [id],
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
    app.get('/deletenote/:id', (req, res) => {
        const { id } = req.params
        db.query("SELECT * FROM deletenote where id=?", [id],
            (err, result) => {
                if (err) {
                    res.json({
                        err: "Server Error"
                    })
                } else {
                    //console.log(result)
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
        const { userId } = req.body
        db.query("SELECT * from notes where id =?", [req.params.id], (error, note2) => {
            if (error) {
                res.json({
                    err: "Server Error"
                })
            }
            //console.log(note2[0])
            db.query("DELETE FROM notes WHERE id = ?", [req.params.id],
                (err, result) => {
                    if (err) {
                        res.json({
                            err: "Server Error"
                        })
                    }
                    db.query("INSERT into deletenote values(?,?,?,?,?,?,?,?)",
                        [null, note2[0].title, note2[0].content,
                            note2[0].createdAt, new Date().toLocaleTimeString(),
                            note2[0].is_done, userId, req.params.id], (e, re) => {
                                if (e) {
                                    console.log(e)
                                    res.json({
                                        err: "Server Error"
                                    })
                                }
                                res.json(result)
                            })

                }
            )

        })
    })
    app.delete('/deletenote/:id', (req, res) => {
        const { userId } = req.body
        //console.log(userId)
        db.query("DELETE FROM deletenote WHERE id = ? and userId = ?", [req.params.id, userId],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.json({
                        err: "Server Error"
                    })
                }

                res.json(result)
            }
        )
    })
    app.delete('/deletenote/recover/:id', (req, res) => {
        const { userId } = req.body
        db.query("SELECT * FROM deletenote where id = ?", [req.params.id], (error, note2) => {
            if (error) {
                res.json({
                    err: "Server Error"
                })
            }
            db.query("DELETE FROM deletenote WHERE id = ? and userId = ?", [req.params.id, userId],
                (err, result) => {
                    if (err) {

                        res.json({
                            err: "Server Error"
                        })
                    }
                    db.query("INSERT into notes values(?,?,?,?,?,?,?)",
                        [note2[0].noteId, note2[0].title, note2[0].content,
                        note2[0].createdAt, new Date().toLocaleTimeString(),
                        note2[0].is_done, userId]
                        , (e, response) => {
                            if (e) {
                                console.log(e)
                                res.json({
                                    err: "Server Error"
                                })
                            }
                            res.json(result)
                        })

                }
            )
        })
    })
    app.delete('/deletenote/oldnote/:id', (req, res) => {

        db.query("DELETE FROM oldnotes WHERE noteId = ?", [req.params.id],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.json({
                        err: "Server Error"
                    })
                }
                res.json(result)
            }
        )
    })

    app.put('/notes/:id', (req, res) => {
        const { title, content, userId } = req.body
        const { id } = req.params

        db.query("SELECT * from notes where id=? and userId=?", [id, userId], (error, response) => {
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

                        db.query("UPDATE oldnotes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE noteId = ? and userId=?",
                            [response[0].title, response[0].content,
                            response[0].createdAt, new Date().toLocaleTimeString(),
                            response[0].is_done, id, userId],
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
        //console.log(req.body)
        const { name, address, state, zip } = req.body
        const { id } = req.params
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
    app.put('/users/password/:id', (req, res) => {
        const { newPass } = req.body
        const { id } = req.params
        db.query(
            "UPDATE users SET password = ? WHERE id = ?", [newPass, id],
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
            db.query("SELECT * from oldnotes where noteId=? and userId=?", [id, userId], (error2, note2) => {
                if (error2) {
                    res.json({
                        err: "Server Error"
                    })
                }
                if (!note2[0].title && !note2[0].content && !note2[0].createdAt) {
                    res.json({
                        err: "Before Undo Please Edit The Note at least One Time"
                    })
                } else {
                    db.query("UPDATE notes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE id = ?",
                        [note2[0].title, note2[0].content,
                        note2[0].createdAt, new Date().toLocaleTimeString(),
                        note2[0].is_done, id],
                        (err, result) => {
                            if (err) {
                                res.json({
                                    err: "Server Error"
                                })
                            }
                            db.query("UPDATE oldnotes SET title=?,content=?,createdAt=?,updatedAt=?,is_done=? WHERE noteId = ?",
                                [note1[0].title, note1[0].content,
                                note1[0].createdAt, new Date().toLocaleTimeString(),
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
                }

            })
        })
    })
}

module.exports = routes