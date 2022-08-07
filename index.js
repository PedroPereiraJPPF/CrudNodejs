const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const Usuario = require('./models/Usuario')
const bodyParser = require('body-parser')

// Config css
app.use(express.static('public'))

// configuração do handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname+'/views');

//Body parser config
app.use(bodyParser.urlencoded({extended : false})) 
app.use(bodyParser.json())

// Rotas
app.get('/', function(req, res){
    // Pegar registros do banco
    Usuario.findAll().then((valores)=>{
        if(valores.length > 0){
            return res.render('users', {NavActiveUsers:true, table:true, usuarios: valores.map(valores => valores.toJSON())})
        }else{
            res.render('users', {NavActiveUsers:true, table:false})
        }
    }).catch((err)=>{
        console.log(`houve um problema: ${err}`)
    })
})

app.get('/registrar', function(req, res){
    res.render('registrar')
})

app.post('/cadastrar', function(req, res){
    var nome = req.body.nome
    var email = req.body.email
    // adicionar valores no banco
    Usuario.create({
        nome: nome,
        email: email.toLowerCase()
    }).then(function(){
        console.log('cadastrado com sucesso')
        return res.redirect('/')
    }).catch(function(err){
        console.log(`aconteceu umm erro ${err}`)
    })
})

// rota editar
app.post('/editar', function(req, res){
    var id = req.body.id
    Usuario.findByPk(id).then((dados)=>{
        return res.render('editar' , {erro:false, id: dados.id, nome: dados.nome, email: dados.email})
    }).catch((err)=>{
        console.log(err)
        return res.render('editar', {erro:true, problema: 'Impossivel editar'})
    })
})
app.post('/update', function(req, res){
    var nome = req.body.nome
    var email = req.body.email
    // atualizar os registros
    Usuario.update(
        {
        nome: nome,
        email: email.toLowerCase()
        },
        {
            where: {
                id: req.body.id
            }
        }).then((resultado)=>{
            console.log('o resultado foi: '+resultado)
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err)
        })
})


app.listen(8081, ()=>{
    console.log('servidor rodando')
})