import {PrismaClient} from '@repo/db/client'
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export const GET = async () => {
    const user = await client.user.create({
        data: {
            email: "newemail@gmail.com",
            password: "newpass"
        }
    })
    // console.log(user);
    return NextResponse.json({
        message: "hi there"
    })
}