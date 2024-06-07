"use client"
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";

import { Center } from "@repo/ui/center";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [mobile, setMobile] = useState("");
    const [amount, setAmount] = useState("");
    return <div className="px-2 h-[80vh]" >
        <Card title="Send Directly" >
            <div className="min-w-72">
                <TextInput label="Mobile Number" placeholder="Mobile Number" type="number" onChange={(value) => {
                    setMobile(value);
                }} />
                <TextInput label="Mobile Number" placeholder="Amount" type="number" onChange={(value) => {
                    setAmount(value);
                }} />
                <div className="flex justify-center">
                    <Button onClick={async () => {
                        await p2pTransfer(mobile, Number(amount) * 100)
                    }}>Send Money</Button>
                </div>
            </div>
        </Card>
    </div>
}