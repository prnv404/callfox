"use client"

import {
    IconBrandWordpress,
    IconShoppingBag,
    IconLetterW,
    IconSquare,
    IconWorld,
    IconPlus,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const plugins = [
    {
        id: "wordpress",
        name: "WordPress",
        description: "Connect your voice agent to your WordPress site for seamless content management and form handling.",
        icon: IconBrandWordpress,
        connected: true,
    },
    {
        id: "shopify",
        name: "Shopify",
        description: "Integrate with your Shopify store to handle order inquiries and product recommendations.",
        icon: IconShoppingBag,
        connected: false,
    },
    {
        id: "wix",
        name: "Wix",
        description: "Add voice capabilities to your Wix website instantly.",
        icon: IconLetterW,
        connected: false,
    },
    {
        id: "squarespace",
        name: "Squarespace",
        description: "Enhance your Squarespace site with intelligent voice interactions.",
        icon: IconSquare,
        connected: false,
    },
    {
        id: "webflow",
        name: "Webflow",
        description: "Connect your Webflow projects with our powerful voice API.",
        icon: IconWorld,
        connected: false,
    },
]

export default function PluginsPage() {
    return (
        <div className="flex flex-col h-full p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Plugins</h1>
                    <p className="text-muted-foreground">Expand your agent's capabilities with no-code platform integrations.</p>
                </div>
                <Button size="sm" className="gap-2">
                    <IconPlus className="h-4 w-4" />
                    Request Plugin
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plugins.map((plugin) => (
                    <Card key={plugin.id} className="flex flex-col p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 text-foreground">
                                    <plugin.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{plugin.name}</h3>
                                    {plugin.connected ? (
                                        <Badge variant="default" className="bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20 text-[10px] px-1.5 py-0">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                            Available
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <Switch checked={plugin.connected} />
                        </div>

                        <p className="text-sm text-muted-foreground flex-1">
                            {plugin.description}
                        </p>

                        <div className="pt-2">
                            <Button variant="outline" className="w-full">
                                {plugin.connected ? "Configure" : "Connect"}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
