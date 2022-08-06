const Sequelize = require('sequelize')
const sequelize = new Sequelize('estudos', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

// testando a conexão
// sequelize.authenticate().then(function(){
//     console.log('conectado com sucesso')
// }).catch(function(err){
//     console.log('erro: '+err)
// })

module.exports = {
    Sequelize, sequelize
}