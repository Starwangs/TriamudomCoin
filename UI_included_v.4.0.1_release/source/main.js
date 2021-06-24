const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const express = require('express')
const app = express()
const PORT = 3000

const myKey = ec.keyFromPrivate('2d8ea2f5859652a333b235b99ed230bf72bc11fc48f30558d9f9c30d3d8727f0')
const myWalletAddress = myKey.getPublic('hex')

const starwangCoin = new Blockchain()

const tx1 = new Transaction(myWalletAddress, 'public here', 0)
tx1.signTransaction(myKey)
starwangCoin.addTransaction(tx1)

starwangCoin.minePendingTransactions(myWalletAddress)

const tx2 = new Transaction(myWalletAddress, 'etc', 30)
tx2.signTransaction(myKey)
starwangCoin.addTransaction(tx2)

starwangCoin.minePendingTransactions(myWalletAddress)

const tx3 = new Transaction(myWalletAddress, 'etc', 70)
tx3.signTransaction(myKey)
starwangCoin.addTransaction(tx3)

starwangCoin.minePendingTransactions(myWalletAddress)

console.log('\n Balance of me is', starwangCoin.getBalanceOfAddress(myWalletAddress))
console.log(starwangCoin.isChainValid())

console.log(starwangCoin.getBlockFromHash('55a6787662201b7d7c18159d973ec9b911e7ab7d5aabd8e77a053a0b4ada2fec'))

starwangCoin.save()





// app.locals.showTransaction = (trans) => {
//     document.querySelector('#printTransaction').innerHTML = trans
// }

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('coin', starwangCoin)
})

app.listen(PORT, () => console.log('Start server at port', PORT))