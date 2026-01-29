"use client"

import * as React from "react"
import {
    IconBrandSlack,
    IconMail,
    IconWebhook,
    IconPlus,
    IconCheck,
    IconTrash,
    IconAlertCircle,
    IconRefresh
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

const apps = [
    {
        id: "slack",
        name: "Slack",
        description: "Receive instant notifications in your channels.",
        icon: IconBrandSlack,
        connected: true,
        color: "bg-[#4A154B] text-white"
    },
    {
        id: "gmail",
        name: "Gmail",
        description: "Sync call summaries to your inbox.",
        icon: IconMail,
        connected: false,
        color: "bg-[#EA4335] text-white"
    }
]

const webhooks = [
    {
        id: "wh_1",
        url: "https://api.acme.com/v1/events",
        status: "active",
        events: ["call.completed", "call.analyzed"],
        lastDelivery: "2 mins ago"
    },
    {
        id: "wh_2",
        url: "https://admin.internal.com/hooks/voice",
        status: "failed",
        events: ["sentiment.alert"],
        lastDelivery: "1 hour ago"
    }
]

// To avoid TypeScript errors with the boolean TRUE placeholder I used above
const TRUE = true;

export default function IntegrationsPage() {
    return (
        <div className="flex flex-col h-full bg-background p-6 lg:p-10 space-y-10 max-w-5xl mx-auto w-full">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
                <p className="text-muted-foreground">Manage your third-party integrations and webhooks.</p>
            </div>

            {/* Apps Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconRefresh className="h-4 w-4 text-muted-foreground" />
                        Apps
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apps.map((app) => (
                        <Card key={app.id} className="border bg-card shadow-sm hover:shadow-md transition-all">
                            <CardContent className="p-5 flex items-start gap-4">
                                <div className={`h-10 w-10 flex items-center justify-center rounded-lg shadow-sm ${app.color}`}>
                                    <app.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm">{app.name}</h3>
                                        <Switch checked={app.connected} />
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        {app.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator />

            {/* Webhooks Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <IconWebhook className="h-4 w-4 text-muted-foreground" />
                            Webhooks
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Receive real-time events to your own endpoints.</p>
                    </div>
                    <Button size="sm" className="gap-2">
                        <IconPlus className="h-3.5 w-3.5" />
                        Add Endpoint
                    </Button>
                </div>

                <Card className="border shadow-sm">
                    <div className="divide-y">
                        {webhooks.map((hook) => (
                            <div key={hook.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-muted/30 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 h-2 w-2 rounded-full ${hook.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <div className="space-y-1">
                                        <div className="font-mono text-xs sm:text-sm font-medium flex items-center gap-2">
                                            {hook.url}
                                            {hook.status === 'failed' && (
                                                <Badge variant="destructive" className="h-4 px-1 py-0 text-[10px] uppercase font-bold tracking-wider">Failed</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>IDs: {hook.events.join(", ")}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="hidden sm:inline">Last: {hook.lastDelivery}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs">Logs</Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                        <IconTrash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-muted/10 p-3 border-t text-xs text-center text-muted-foreground">
                        Powered by Svix-like reliability
                    </div>
                </Card>
            </section>
        </div>
    )
}
