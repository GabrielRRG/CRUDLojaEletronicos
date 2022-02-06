
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:  'lojaBD'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * FROM `lojaBD`.`Produto`"
    db.query(sqlSelect, (err, result)=>{
        if (err){
            console.log(err);
        }
        else 
        res.send(result);
    
    });


});
app.delete('/api/delete/:nomeProduto', (req, res) => {
    const nome = req.params.nomeProduto;
    const sqlDelete = 
    "DELETE FROM `lojaBD`.`Produto` WHERE nomeProduto = ?";    
    db.query(sqlDelete, nome, (err, result) => {
        if (err) console.log(err)
        else
        console.log("Apagado com sucesso!");
    }
    );

});
app.put("/api/update/", (req, res) => {
    const nome = req.body.nomeProduto;    
    const quantidade = req.body.quantidade;
    const sqlUpdate = "UPDATE  `lojaBD`.`Produto` SET QUANTIDADE = ? where nomeProduto = ? ";
    db.query(sqlUpdate, [quantidade, nome],  (err, result) =>{
        if (err) console.log(err);
    }
    );
}

);
app.post ("/api/insert", (req, res) =>{
    const nomeProduto = req.body.nomeProduto;
    const precoProduto = req.body.precoProduto;
    const descricaoProduto = req.body.descricaoProduto;
    const quantidadeProduto = req.body.quantidade;
    const sqlInsert = "INSERT INTO `lojaBD`.`Produto`(nomeProduto, precoProduto, descricaoProduto, quantidade) VALUES (?,?,?,?)"
    db.query(sqlInsert, [nomeProduto, precoProduto, descricaoProduto, quantidadeProduto], (err,result)=>{
        if (err){
            console.log(err);
        }
        else{
            console.log("Inserido com sucesso");
        }
    })


});
app.listen(3001, () => {
    console.log('aplicacao rodando na porta 3001');

});




