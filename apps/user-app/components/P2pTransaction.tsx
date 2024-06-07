import { Card } from "@repo/ui/card"

export const P2PTransaction = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        to: string,
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between border-b py-1">
                <div>
                    <div className="text-sm">
                        INR Sent
                    </div>
                    <div className="text-slate-600 text-xs">
                        To - {t.to}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}