import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import db from '@repo/db/client'
import { chownSync } from "fs";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Phone number",
            credentials: {
                phone: { label: 'Phone Number', type: 'text', placeholder: '1234567890', required: true },
                password: { label: 'Password', type: 'password', placeholder: 'Password', required: true }
            },

            //TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);

                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    // console.log(existingUser);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                            number: existingUser.number
                        }
                    }
                    return null;

                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    //send OTP for varification
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number
                    }
                } catch (e) {
                    console.error(e);
                }
                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        session:({token,session}:any)=>{
            session.user.id = token.sub
            // console.log("token");
            // console.log(token);
            // console.log("sesion");

            // console.log(session);
            return session
        }
    },
    // NEXTAUTH_URL = process.env.NEXTAUTH_URL
}