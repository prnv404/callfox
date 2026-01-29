"use client"

import * as React from "react"
import {
    IconWorld,
    IconFileText,
    IconTypography,
    IconFolderPlus,
    IconSearch,
    IconDots,
    IconWorldWww,
    IconFilter
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function KnowledgePage() {
    return (
        <div className="flex flex-col h-full p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
                <div className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>RAG Storage: <span className="font-medium text-foreground">1.5 kB</span> / 1.0 MB</span>
                </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ActionCard
                    icon={<IconWorld className="h-6 w-6" />}
                    title="Add URL"
                />
                <ActionCard
                    icon={<IconFileText className="h-6 w-6" />}
                    title="Add Files"
                />
                <ActionCard
                    icon={<IconTypography className="h-6 w-6" />}
                    title="Create Text"
                />
                <ActionCard
                    icon={<IconFolderPlus className="h-6 w-6" />}
                    title="Create Folder"
                />
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search Knowledge Base..."
                        className="pl-9 bg-muted/20 border-border/40"
                    />
                </div>
                <Button variant="outline" size="sm" className="h-9 gap-2 border-border/40 bg-muted/20">
                    <IconFilter className="h-3.5 w-3.5" />
                    Type
                </Button>
            </div>

            {/* Content List */}
            <div className="flex-1 space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-[auto_1fr_200px_200px] items-center gap-4 px-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Checkbox className="border-muted-foreground/40" />
                    </div>
                    <div>Name</div>
                    <div>Created by</div>
                    <div>Last updated</div>
                </div>

                {/* List Item */}
                <div className="group flex items-center gap-4 rounded-lg p-2 hover:bg-muted/30 transition-colors">
                    {/* Needs to match grid above, but using flex for better control on mobile if needed, though grid is safer for alignment */}
                    <div className="grid grid-cols-[auto_1fr_200px_200px] w-full items-center gap-4 px-2">
                        <div className="flex items-center">
                            <Checkbox className="border-muted-foreground/40" />
                        </div>

                        <div className="flex items-start gap-3 overflow-hidden">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted/30 text-muted-foreground">
                                <IconWorldWww className="h-5 w-5" />
                            </div>
                            <div className="grid gap-0.5 relative top-0.5">
                                <span className="font-medium truncate leading-none">Alleppey Tourism - Discover the Venice of the East</span>
                                <span className="truncate text-xs text-muted-foreground">https://alleppeytourism.in</span>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            pranav s
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Jan 26, 2026, 9:49 PM</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <IconDots className="h-4 w-4" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Rename</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function ActionCard({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <Card className="flex flex-col justify-end gap-4 p-6 cursor-pointer hover:bg-muted/40 transition-colors bg-muted/10 border-border/40 h-32">
            <div className="text-muted-foreground">
                {icon}
            </div>
            <span className="font-medium text-sm">{title}</span>
        </Card>
    )
}
