const express = require('express')
const app = express();
app.use(express.json())
const port = 6000;

app.use('/',require('./router'))
app.use('/',require('./database'))

app.listen(port,()=>{
    console.log(`server is working with port${port}`)
});
