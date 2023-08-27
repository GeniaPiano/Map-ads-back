import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/error";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(json());

//Routers...
// app.get('/', async (req, res)=> {
//     throw new ValidationError('Daaaaaamn!')
// })

app.use(handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('listening on port http://localhost:3001')
});