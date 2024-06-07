"use server"

import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfer(to:string,amount:number){
    const session = await getServerSession(NEXT_AUTH);
    const from = session.user.id;
    if(!from){
        return {
            message: "Error while sending money"
        }
    }
    const toUser = await prisma.user.findFirst({
        where:{
            number:to
        }
    });

    if(!toUser){
        return {
            message:"User not Found"
        }
    }

    await prisma.$transaction(async (tx)=>{
        // to lock the transaction so no two transaction can happen at the same time.
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where:{userId:Number(from)}
        });
        // console.log("before sleep")
        // await new Promise(resolve=>setTimeout(resolve,4000));
        // console.log("After sleep")
        if(!fromBalance || fromBalance.amount < amount){
                throw new Error("Insufficient funds");
        }
        await tx.balance.update({
            where:{userId:Number(from)},
            data:{amount:{decrement:amount}}
        });

        await tx.balance.update({
            where:{userId:toUser.id},
            data:{amount:{increment:amount}}
        });

        await tx.p2pTransfer.create({
            data:{
                fromUserID: Number(from),
                toUserID:toUser.id,
                amount,
                timestamp:new Date()
            }
        })
    });

}