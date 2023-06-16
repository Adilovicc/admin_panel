import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'


export default async function updateRequest(req:NextApiRequest, res:NextApiResponse){
    const {request,email} = req.body;
    const requestUnziped = JSON.parse(request);
    const currentTime = new Date();
    const prisma = new PrismaClient();

    try {
        const profile=await prisma.limitRequest.update({
            where:{
                id:requestUnziped.id,
            },
            data:{
                resolvedTime:currentTime,
                resolvedBy:email,
                status:'approved'     
            },
        });
        return res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        console.log('Error occurred');
        return res.status(500).json({ message: 'An error occurred' });
    }
    
    
}