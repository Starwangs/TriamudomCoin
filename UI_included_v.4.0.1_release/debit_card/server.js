const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')

app.get('/:PUBLIC-:PRIVATE', (req, res) => {
    res.render('debit', {
        public: req.params.PUBLIC,
        private: req.params.PRIVATE,
        address: [req.params.PUBLIC.substring(0, 1).toUpperCase(),
            req.params.PUBLIC.substring(1, 2).toUpperCase(),
            req.params.PUBLIC.substring(2, 3).toUpperCase(),
            req.params.PUBLIC.substring(3, 4).toUpperCase(),
            ' ',
            req.params.PUBLIC.substring(4, 5).toUpperCase(),
            req.params.PUBLIC.substring(5, 6).toUpperCase(),
            req.params.PUBLIC.substring(6, 7).toUpperCase(),
            req.params.PUBLIC.substring(7, 8).toUpperCase(),
            ' ',
            req.params.PUBLIC.substring(8, 9).toUpperCase(),
            req.params.PUBLIC.substring(9, 10).toUpperCase(),
            req.params.PUBLIC.substring(10, 11).toUpperCase(),
            req.params.PUBLIC.substring(11, 12).toUpperCase(),
            ' ',
            req.params.PUBLIC.substring(12, 13).toUpperCase(),
            req.params.PUBLIC.substring(13, 14).toUpperCase(),
            req.params.PUBLIC.substring(14, 15).toUpperCase(),
            req.params.PUBLIC.substring(15, 16).toUpperCase()
        ].join(''),
        ccv: req.params.PRIVATE.substr(req.params.PRIVATE.length - 3).toUpperCase()
    })
})

// app.get('/key/:PUBLIC-:PRIVATE', (req, res) => {
//     res.send(req.params)
// })

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))