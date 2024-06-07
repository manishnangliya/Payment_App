import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../lib/auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (session?.user) {
            return NextResponse.json({
                user: session.user
            })
        }
    } catch (e) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })

}