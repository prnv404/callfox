"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconSearch, IconFilter, IconPlayerPlay, IconPhoneIncoming, IconPhoneOutgoing, IconPhoneX } from "@tabler/icons-react"

const calls = [
    {
        id: "CALL-8329",
        agent: "Sales Bot Alpha",
        customer: "+1 (555) 123-4567",
        direction: "Outbound",
        duration: "4m 12s",
        status: "Completed",
        date: "2026-01-29 10:45 AM",
    },
    {
        id: "CALL-8330",
        agent: "Support Agent Beta",
        customer: "+1 (555) 987-6543",
        direction: "Inbound",
        duration: "1m 05s",
        status: "Completed",
        date: "2026-01-29 10:15 AM",
    },
    {
        id: "CALL-8331",
        agent: "Sales Bot Alpha",
        customer: "+1 (555) 456-7890",
        direction: "Outbound",
        duration: "0s",
        status: "Missed",
        date: "2026-01-29 09:30 AM",
    },
    {
        id: "CALL-8332",
        agent: "Survey Bot Gamma",
        customer: "+1 (555) 234-5678",
        direction: "Outbound",
        duration: "2m 30s",
        status: "Completed",
        date: "2026-01-28 04:20 PM",
    },
    {
        id: "CALL-8333",
        agent: "Sales Bot Alpha",
        customer: "+1 (555) 876-0000",
        direction: "Outbound",
        duration: "15s",
        status: "Failed",
        date: "2026-01-28 02:10 PM",
    },
]

export default function CallsPage() {
    return (
        <div className="flex flex-col h-full p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Call Logs</h1>
                    <p className="text-muted-foreground">History of all voice agent interactions.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search logs..."
                        className="pl-9"
                    />
                </div>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                    <IconFilter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Call ID</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Recording</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calls.map((call) => (
                            <TableRow key={call.id}>
                                <TableCell>
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted/50">
                                        {call.direction === "Outbound" ? (
                                            <IconPhoneOutgoing className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <IconPhoneIncoming className="h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-xs text-muted-foreground">{call.id}</TableCell>
                                <TableCell>{call.agent}</TableCell>
                                <TableCell>{call.customer}</TableCell>
                                <TableCell>{call.duration}</TableCell>
                                <TableCell>
                                    <StatusBadge status={call.status} />
                                </TableCell>
                                <TableCell>
                                    {call.status === "Completed" && (
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                                            <IconPlayerPlay className="h-4 w-4" />
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">{call.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    let className = ""

    if (status === "Completed") className = "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20"
    if (status === "Missed") className = "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/20"
    if (status === "Failed") className = "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20"

    return (
        <Badge variant="outline" className={className}>
            {status}
        </Badge>
    )
}
