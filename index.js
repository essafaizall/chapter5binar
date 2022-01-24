const exp = require('constants')
const e = require('express')
const express = require('express')
const req = require('express/lib/request')
const { json } = require('express/lib/response')
const res = require('express/lib/response')
const PORT = 3003
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

app.use(express.json()) // parsing req.body bentukan json
app.use(express.urlencoded({ extended: true })) // parsing req.body bentukan x-www-urlencoded


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(__dirname + '/public'));

const apiRouter = express.Router()
const v1 = express.Router()

app.use('/api', apiRouter)
apiRouter.use('/v1', v1)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/dashboard', (req, res) => {
    const usersData = fs.readFileSync('data/pengguna.json', 'utf-8')
    const users = JSON.parse(usersData)
    res.render('dashboard', {
        users
    })
})

v1.get('/edit/:id', (req, res) => {
    const { id } = req.params
    const usersData = fs.readFileSync('data/pengguna.json', 'utf-8')
    const users = JSON.parse(usersData)
    const pencarianData = users.filter((item) => item.id == id)
    res.render('edit-data', {
        pencarianData
    })
})
v1.post('/update', (req, res) => {
    const { id, username, password, fullname, email } = req.body
  
    if (!id) { //kenapa ya bang ichanq klo pk id ga bisa tapi pake username jadi bisa
      res.status(400).json({
        message: "please input product id"
      })
    } else {
      let readProductJson = fs.readFileSync('data/pengguna.json', 'utf-8')
      const data = JSON.parse(readProductJson)
      const cariData = data.find((product) => product.id == id) //kenapa ya bang ichanq klo pk id ga bisa tapi pake username jadi bisa
  
      if (!cariData) {
        res.status(404).json({
          message: "Data tidak ditemukan"
        })
      } else {
        const updatedProduct = {
          id: cariData.id,
          username: username ?? cariData.username,
          password: password ?? cariData.password,
          fullname: fullname ?? cariData.fullname,
          email: email ?? cariData.email,
        }
  
        // cari index dalem array
        const updateProductIndex = data.findIndex((item) => item.id == id)
        console.log(updateProductIndex)
        data[updateProductIndex] = updatedProduct
  
        fs.writeFileSync('data/pengguna.json', JSON.stringify(data, null, 2))
        res.redirect('/dashboard')
      }
    }
})


app.get('/playyy', (req, res) => {
    res.render('edit-data')
})


app.get('/play', (req, res) => {
    res.render('game')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

apiRouter.get('/', (req, res) => {
    res.render('login')
})

v1.get('/', (req, res) => {
    res.status(200).send(`Halaman induknya v1`)
})


v1.post('/login', (req, res) => {
    const { username, password } = req.body
    const foundUser = fs.readFileSync('data/pengguna.json', 'utf-8')
    const parsedDatanya = JSON.parse(foundUser)
    const DataDitemukan = parsedDatanya.find((user) => user.username == username)

    if(!DataDitemukan){
        res.redirect('/login')
    } else if(DataDitemukan.password == password){
        res.redirect('/dashboard')
    } else{
        res.redirect('/login')
    }
})

v1.post('/register', (req, res) => {
    const fileUser = fs.readFileSync('data/pengguna.json', 'utf-8')
    const parsedFileUser = JSON.parse(fileUser)
    const newUser = {
      id: uuidv4(),
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
      email: req.body.email
    }
    parsedFileUser.push(newUser)
  
    fs.writeFileSync('data/pengguna.json', JSON.stringify(parsedFileUser, null, 4))
    
    res.redirect('/login')
})
v1.get("/delete/:id", (req, res) => {
    const { id } = req.params
    if (!id) {
        //dilakukan pengecekan apakah parameter id ada
      res.status(400).json({
        message: "id tidak ada"
      })
    } else {
      let bacaJson = fs.readFileSync('data/pengguna.json', 'utf-8')
      const data = JSON.parse(bacaJson)
      const pencarianData = data.find((item) => item.id == id)
  
      if (!pencarianData) {
        res.status(404).json({
          message: "data is not available :("
        })
      } else {
        const deleteAkun = data.filter((item) => item.id != id)
  
        fs.writeFileSync('data/pengguna.json', JSON.stringify(deleteAkun, null, 2))
        res.redirect('/dashboard')
      }
    }
  })
  

app.listen(PORT, (req, res) => {
    console.log(`Sedang menjalankan di log ${PORT}`)
})