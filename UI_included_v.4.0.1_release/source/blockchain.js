// const fs = require('fs')
const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
        this.timestamp = Date.now()
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You can\'t sign transactions for other wallets!')
        }

        const hashTx = this.calculateHash()
        const sig = signingKey.sign(hashTx, 'base64')
        this.signature = sig.toDER('hex')
    }

    isValid() {
        if (this.fromAddress === null) return true
        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction')
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
        return publicKey.verify(this.calculateHash(), this.signature)
    }
}

class Block {
    constructor(index = 0, timestamp, transactions, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
                this.hash = this.calculateHash()
        }

        console.log(`Block mined: ${this.hash}`)
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false
            }
        }

        return true
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), [], '0')
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
        this.pendingTransactions.push(rewardTx)

        const block = new Block(this.getLatesBlock().index + 1, Date.now(), this.pendingTransactions, this.getLatesBlock().hash)
        block.mineBlock(this.difficulty)

        console.log('Block successfully mined!')
        this.chain.push(block)

        this.pendingTransactions = []
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address')
        }
        if (!transaction.isValid()) {
            throw new Error('Can\'t add invalid transaction to chain')
        }
        if (this.getBalanceOfAddress(transaction.fromAddress) - transaction.amount < 0) {
            throw new Error('Doesn\'t have enought coin to create Transaction')
        }

        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {

            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }

        }

        return balance;
    }

    getAllTransactionsForWallet(address) {
        const txs = []

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address || trans.toAddress === address) {
                    txs.push(trans)
                }
            }
        }

        return txs;
    }

    getBlockFromHash(hash) {
        for (const block of this.chain) {
            if (block.hash = hash) {
                return block
            }

            return false
        }
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (!currentBlock.hasValidTransactions()) {
                return false
            }

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false

            if (currentBlock.previousHash !== previousBlock.hash)
                return false
        }

        return true
    }

    save() {
        // fs.writeFileSync('log.json', JSON.stringify(this, null, 4))
        return false
    }
}

module.exports.Blockchain = Blockchain
module.exports.Transaction = Transaction