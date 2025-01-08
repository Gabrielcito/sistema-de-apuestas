import express, { application } from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.post("/getCode", async (req, res) => {
    const code = uuidv4().slice(0, 6);

    if(!code){
        return res.status(500).json({ error: "Error al crear codigo"})
    }

    return res.status(201).json({ code: code })
    
})


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})