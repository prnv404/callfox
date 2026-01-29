"use client"

import { Button } from "@/components/ui/button"
import { IconPlus, IconRobot } from "@tabler/icons-react"
import Link from "next/link"

export default function AgentsPage() {
    // This would typically fetch agents from an API
    const agents = []

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Agents</h1>
                <Button asChild>
                    <Link href="/dashboard/agents/new">
                        <IconPlus className="mr-2 h-4 w-4" />
                        Create Agent
                    </Link>
                </Button>
            </div>

            {agents.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center p-8">
                        <div className="mb-4 rounded-full bg-primary/10 p-4">
                            <IconRobot className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">No agents created</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mb-4">
                            Get started by creating your first AI agent. Choose from our templates or build from scratch.
                        </p>
                        <Button asChild>
                            <Link href="/dashboard/agents/new">
                                Create Agent
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Active agents grid would go here */}
                </div>
            )}
        </div>
    )
}
