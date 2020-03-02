const Web3 = require('web3');
const express = require('express');
const app = express();
const port = 1234;
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const Config = require('../build/contracts/obscure_lock.json');
var contract = new web3.eth.Contract(Config.abi,'0x20d7FBab4Ba246F6bCBdA5Ed49A19E0A6F41d9aE');
app.get('/setData',(req,res)=>{
    // console.log(req.query);
	let locker_id = req.query.locker_id;
    let user_id = req.query.user_id;
    let status = req.query.status;
    let weight = req.query.weight;
    let timestemp = req.query.timestemp;
	
	let data = {
        locker_id: String(locker_id),
        status:    String(status),
        timestemp: String(timestemp),
        user_id:   String(user_id),
        weight :   String(weight)
    };
    // data.locker_id,data.user_id,data.status,data.weight,data.timestemp
    console.log(data);
	web3.eth.getAccounts()
    .then(fetchedAccounts=>{
        var acc=fetchedAccounts[0];
        return contract.methods.set(data.locker_id,data.user_id,data.status,data.weight,data.timestemp).send({from:acc,gas:3000000});
    }).then(data=>{
    	res.send(JSON.stringify(data));
    }).catch(err=>{
        console.log("Error  : "+err);
        res.send(err);
    });
});
app.get('/getData',(req,res)=>{
	data=[];
	contract.methods.get().call()
    .then(data=>{
        for(let i in data){
        	data.push(i);
        }
        res.send(JSON.stringify(data));
    })
    .catch(err=>{
        console.log(err);
    });
});
app.listen(port ,()=>{
	console.log(`Server Is Started On Port : ${port} .`)
});