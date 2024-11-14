import { Request , Response } from "express";
import prisma from "./db";
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 3000;
const cors     = require('cors');
const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}


app.use(express.json());
app.use(cors(corsOption));

const myURL : string = "https://13.61.8.125:3000";

function randomIdgenerator() : number{
    return Math.floor(Math.random() * 10 ** 13);
}

function toBase62(num: number): string {
    const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    if (num === 0) return base62Chars[0];

    while (num > 0) {
        result = base62Chars[num % 62] + result;
        num = Math.floor(num / 62);
    }

    return result;
}

app.post('/hash-url', async(req : Request, res : Response) => {
  const url = req.body.url;
  const id : number = randomIdgenerator();
  const shortUrl = toBase62(id);

  const response = await prisma.url.create({
    data: {
      id: id,
      shortURL: shortUrl,
      longURL: url
    }
  });

  if(response){
    res.status(200).json({
      shortUrl: `${myURL}/${shortUrl}`
    });
  }else{
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

app.get('/:shorturl', async(req : Request, res : Response) => {
    const shorturl : string = req.params.shorturl;
    const response = await prisma.url.findUnique({
      where: {
        shortURL: shorturl
      }
    });
    if(response){
      const url = "https://" + response.longURL;
      res.redirect(url);
    }else{
      res.status(404).json({
        error: "Not Found"
      });
    }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});