const express = require('express'); 
const app = express();
const router = express.Router();

router.get('/', (req, res)=>{
    console.log("mv")
    res.send("hello everyone");
});

router.get('/myapp', (req, res) => {
    res.send('This is a separate page!');
});

console.log("Hello World This is the first program!"); 

module.exports = router;
