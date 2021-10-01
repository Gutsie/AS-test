const axios = require("axios");


import { getLunchData } from '../../lib/helpers'
export default async function handler(req, res){
    res.status(200).json(await getLunchData())
}