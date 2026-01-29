"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AGENT_TYPES, INDUSTRIES, USE_CASES } from "./constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
// Using tabler icons to match sidebar
import { IconChevronRight, IconArrowLeft, IconCheck } from "@tabler/icons-react"
import { motion, AnimatePresence } from "framer-motion"

type Step = "type" | "industry" | "usecase" | "details"

interface AgentData {
    type: string
    industry: string
    useCase: string
    name: string
    website: string
    goal: string
}

const stepsOrder: Step[] = ["type", "industry", "usecase", "details"]

export function AgentWizard() {
    const router = useRouter()
    const [step, setStep] = React.useState<Step>("type")
    const [history, setHistory] = React.useState<Step[]>([])
    const [data, setData] = React.useState<AgentData>({
        type: "",
        industry: "",
        useCase: "",
        name: "",
        website: "",
        goal: "",
    })

    const handleStepChange = (nextStep: Step) => {
        setHistory((prev) => [...prev, step])
        setStep(nextStep)
    }

    const goBack = () => {
        const prevStep = history[history.length - 1]
        if (prevStep) {
            setHistory((prev) => prev.slice(0, -1))
            setStep(prevStep)
        } else {
            router.push("/dashboard/agents")
        }
    }

    const handleTypeSelect = (typeId: string) => {
        setData((prev) => ({ ...prev, type: typeId }))
        if (typeId === "business") {
            handleStepChange("industry")
        } else {
            handleStepChange("details")
        }
    }

    const handleIndustrySelect = (industryId: string) => {
        setData((prev) => ({ ...prev, industry: industryId }))
        handleStepChange("usecase")
    }

    const handleUseCaseSelect = (useCaseId: string) => {
        setData((prev) => ({ ...prev, useCase: useCaseId }))
        handleStepChange("details")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Creating agent with data:", data)
        router.push("/dashboard/agents")
    }

    // Progress calculation
    const totalSteps = data.type === "business" ? 4 : 2
    const currentStepIndex = data.type === "business"
        ? stepsOrder.indexOf(step) + 1
        : step === "type" ? 1 : 2

    return (
        <div className="mx-auto max-w-3xl py-12 px-6">
            {/* Header Area */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={goBack}
                    className="pl-0 text-muted-foreground hover:text-foreground mb-4 h-auto p-0 hover:bg-transparent"
                >
                    <IconArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Create Agent</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Step {currentStepIndex} of {totalSteps}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Step 1: Agent Type */}
                    {step === "type" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-3">
                                {AGENT_TYPES.map((type) => (
                                    <div
                                        key={type.id}
                                        className={cn(
                                            "group relative flex flex-col justify-between rounded-lg border p-6 hover:bg-accent/50 cursor-pointer transition-colors",
                                            data.type === type.id && "border-primary bg-accent"
                                        )}
                                        onClick={() => handleTypeSelect(type.id)}
                                    >
                                        <div>
                                            <type.icon className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                                            <h3 className="font-medium leading-none mb-2">{type.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {type.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Industry */}
                    {step === "industry" && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Select Industry</h2>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {INDUSTRIES.map((ind) => (
                                    <div
                                        key={ind.id}
                                        className={cn(
                                            "group flex flex-col items-center justify-center rounded-lg border p-6 text-center hover:bg-accent/50 cursor-pointer transition-colors",
                                            data.industry === ind.id && "border-primary bg-accent"
                                        )}
                                        onClick={() => handleIndustrySelect(ind.id)}
                                    >
                                        <ind.icon className="h-8 w-8 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        <span className="text-sm font-medium">{ind.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Use Case */}
                    {step === "usecase" && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Select Use Case</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {(USE_CASES[data.industry] || USE_CASES.default).map((uc) => (
                                    <div
                                        key={uc.id}
                                        className={cn(
                                            "flex items-start gap-4 rounded-lg border p-4 hover:bg-accent/50 cursor-pointer transition-colors",
                                            data.useCase === uc.id && "border-primary bg-accent"
                                        )}
                                        onClick={() => handleUseCaseSelect(uc.id)}
                                    >
                                        <div className="rounded-md border p-2 bg-background">
                                            <uc.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {uc.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {uc.description}
                                            </p>
                                        </div>
                                        <IconChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Details */}
                    {step === "details" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Agent Details</CardTitle>
                                <CardDescription>
                                    Configure the final details for your agent.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Agent Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Support Bot"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website URL (Optional)</Label>
                                        <Input
                                            id="website"
                                            placeholder="https://example.com"
                                            value={data.website}
                                            onChange={(e) => setData({ ...data, website: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="goal">Primary Instruction</Label>
                                        <Textarea
                                            id="goal"
                                            placeholder="What should this agent do?"
                                            className="min-h-[100px]"
                                            value={data.goal}
                                            onChange={(e) => setData({ ...data, goal: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit">
                                            Create Agent
                                            <IconCheck className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
