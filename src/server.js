const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const cors = require('cors');

const app = express();

app.use(cors({
    
        credentials:true,
        origin: 'http://localhost:3000',
    
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 500000 }));

app.use('/api', router)

app.listen(7000, () => {
    console.log('server running on port', 7000);
})