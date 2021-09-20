
function routes(app, db) {
    app.post('/signup', (req, res) => {
        const { name, email, password } = req.body
        db.query("INSERT into users values(?,?,?,?)", [null, name, email, password],
            (err, result) => {
                if(err){
                    res.json({
                        err : "Server Error"
                    })
                }
            }
        )
    })
    
    app.post('/login', (req, res) => {
        const { name, email, password } = req.body
        db.query("Select * from users where email = ? and password = ?", [email, password],
            (err, result) => {
                if(err){
                    res.json({
                        err : "Server Error"
                    })
                }
                const size = Object.keys(result).length
                
                if(result!=0){
                    res.status(200).json(result);
                }else{
                    res.send({
                        message : "Wrong Email/Password"
                    })
                }
            }
        )
    })
    app.post('/addnote', (req, res) => {
        const { title,content } = req.body
        
        db.query("INSERT into notes values(?,?,?,?,?,?)", 
        [null, title, content, new Date().toLocaleTimeString(),new Date().toLocaleTimeString(),1],
            (err, result) => {
                if(err){
                    res.json({
                        err : "Server Error"
                    })
                }
                const size = Object.keys(result).length
                if(result!=0){
                    res.status(200).json(result);
                }else{
                    res.send({
                        err : "Something went wrong"
                    })
                }
            }
        )
    })
    app.get('/notes', (req, res) => {
       
        db.query("SELECT * FROM notes",
            (err, result) => {
                if(err){
                    res.json({
                        err : "Server Error"
                    })
                }else{
                    res.json(result)
                }
            }
        )
    })
    app.delete('/notes/:id', (req, res) => {
        db.query("DELETE FROM notes WHERE id = ?",[req.params.id],
            (err, result) => {
                if(err){
                    res.json({
                        err : "Server Error"
                    })
                }else{
                    res.json(result)
                }
            }
        )
    })
    app.put('/notes/:id', (req, res) => {
        const {title,content} = req.body
        const {id} = req.params
        console.log(id)
        db.query("UPDATE notes SET title=?,content=? WHERE id = ?",[title,content,id],
            (err, result) => {
                if(err){
                   
                    res.json({
                        err : "Server Error"
                    })
                }else{
                    res.json(result)
                    
                }
            }
        )
    })
}

module.exports = routes