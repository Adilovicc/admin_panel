import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'


export default async function getRequests(req:NextApiRequest, res:NextApiResponse){
   
      const {startAt, pending, rejected,approved} = req.query;
      const prisma = new PrismaClient();
      try{
        const records = await prisma.limitRequest.findMany({

            where:{
                   OR:[
                     {status:String(pending)},
                      {status:String(approved)},
                      {status:String(rejected)}
                   ]
                },
            include: {author:true},
            skip:Number(startAt),
            take:3
        }).catch(err=>console.log(err));
        console.log(records);
        return res.json(records);
      }
      catch{
        return res.status(500).json({ message: 'An error occurred' });
      }
}