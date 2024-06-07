
import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { NEXT_AUTH } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransaction } from "../../../components/P2pTransaction";


async function getP2PTransactions() {
    const session = await getServerSession(NEXT_AUTH);
    const txns = await prisma.p2pTransfer.findMany({
        where:{
            fromUserID : Number(session.user.id),
        },
        include:{
            toUser:{
                select:{
                    number:true
                }
            }
        }
    })
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to:t.toUser.number
    }))
}

export default async function () {
    const transactions = await getP2PTransactions();
    return (
        <div className="px-2">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-between pt-4">
                <div className="">
                    <SendCard />
                </div>
                <div>
                    <div >
                        <P2PTransaction transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )

}