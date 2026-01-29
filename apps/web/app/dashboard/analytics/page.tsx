"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    BarChart,
    Pie,
    PieChart,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts"
import {
    IconPhoneCheck,
    IconClock,
    IconTrendingUp,
    IconCurrencyDollar,
    IconArrowUpRight,
    IconArrowDownRight,
    IconFilter,
    IconBulb,
    IconTarget,
    IconMessageCircle,
    IconBrain,
    IconChartBar,
    IconAlertTriangle,
    IconSparkles,
    IconTrophy,
    IconThumbUp,
    IconThumbDown,
    IconMinus,
    IconPlayerPlay,
    IconFileText,
    IconSearch,
    IconCalendar,
    IconUser,
    IconSortDescending
} from "@tabler/icons-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Data for Overview Cards
const overviewData = [
    {
        title: "Total Calls",
        value: "12,450",
        change: "+12.5%",
        trend: "up",
        icon: IconPhoneCheck,
    },
    {
        title: "Avg Duration",
        value: "4m 12s",
        change: "-2.1%",
        trend: "down",
        icon: IconClock,
    },
    {
        title: "Success Rate",
        value: "94.2%",
        change: "+4.1%",
        trend: "up",
        icon: IconTrendingUp,
    },
    {
        title: "Cost Savings",
        value: "$34,200",
        change: "+18.2%",
        trend: "up",
        icon: IconCurrencyDollar,
    },
]

// Insight Highlights
const aiInsights = [
    {
        title: "Pricing Resistance",
        description: "15% of dropped calls occur when the 'Pro Plan' pricing is mentioned.",
        action: "Review pitch for Pro Plan",
        type: "warning",
        icon: IconAlertTriangle,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        title: "New Feature Interest",
        description: "Customers are asking about 'Integration Support' 3x more than last month.",
        action: "Prioritize integration docs",
        type: "opportunity",
        icon: IconSparkles,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "Top Agent Performance",
        description: "'Sales Bot Alpha' has the highest conversion rate (22%) for cold leads.",
        action: "Clone strategy to Beta",
        type: "positive",
        icon: IconTrophy,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    }
]

// Conversion Funnel Data - Fixed Colors
const funnelData = [
    { stage: "Call Started", count: 12450, fill: "#3b82f6" }, // blue-500
    { stage: "Product Explained", count: 8500, fill: "#60a5fa" }, // blue-400
    { stage: "Interest Shown", count: 4200, fill: "#93c5fd" }, // blue-300
    { stage: "Quote Sent", count: 1800, fill: "#bfdbfe" }, // blue-200
    { stage: "Deal Closed", count: 950, fill: "#dbeafe" }, // blue-100
]

const funnelConfig = {
    count: { label: "Users", color: "#3b82f6" }
} satisfies ChartConfig

// Common Questions
const commonQuestions = [
    { question: "Do you offer a free trial?", count: 1240, sentiment: "neutral" },
    { question: "How does the integration with Slack work?", count: 850, sentiment: "positive" },
    { question: "Why is the enterprise plan so expensive?", count: 420, sentiment: "negative" },
    { question: "Can I cancel anytime?", count: 380, sentiment: "neutral" },
]

// Recent Calls Meta Data
const recentCalls = [
    { id: "CALL-1023", customer: "+1 (555) 123-4567", agent: "Sales Bot Alpha", date: "2 mins ago", duration: "3m 45s", sentiment: "positive", summary: "Customer explicitly asked for Pro plan pricing. Mentioned budget constraints but showed strong interest in voice features.", tags: ["Sales", "Pricing"] },
    { id: "CALL-1022", customer: "+1 (555) 987-6543", agent: "Support Agent Beta", date: "15 mins ago", duration: "1m 20s", sentiment: "negative", summary: "Frustrated with login timeout issues. Threatened to churn if not resolved by end of week.", tags: ["Support", "Bug"] },
    { id: "CALL-1021", customer: "+1 (555) 456-7890", agent: "Survey Bot Gamma", date: "32 mins ago", duration: "5m 10s", sentiment: "neutral", summary: "Completed satisfaction survey. Rated 8/10. Requested more documentation on API usage.", tags: ["Survey", "Feedback"] },
    { id: "CALL-1020", customer: "+1 (555) 234-5678", agent: "Sales Bot Alpha", date: "1 hour ago", duration: "45s", sentiment: "neutral", summary: "User hung up immediately after greeting by agent. No meaningful data collected.", tags: ["Dropped"] },
    { id: "CALL-1019", customer: "+1 (555) 876-5432", agent: "Sales Bot Alpha", date: "1 hour ago", duration: "6m 30s", sentiment: "positive", summary: "Highly engaged. Scheduled a demo for next Tuesday at 2 PM. Key decision maker confirmed.", tags: ["Sales", "Conversion"] },
]

// Data for Call Volume Chart (Area)
const volumeData = [
    { date: "2024-06-01", inbound: 120, outbound: 80 },
    { date: "2024-06-02", inbound: 132, outbound: 90 },
    { date: "2024-06-03", inbound: 101, outbound: 150 },
    { date: "2024-06-04", inbound: 134, outbound: 100 },
    { date: "2024-06-05", inbound: 90, outbound: 60 },
    { date: "2024-06-06", inbound: 230, outbound: 150 },
    { date: "2024-06-07", inbound: 210, outbound: 180 },
    { date: "2024-06-08", inbound: 180, outbound: 120 },
    { date: "2024-06-09", inbound: 150, outbound: 90 },
    { date: "2024-06-10", inbound: 250, outbound: 200 },
    { date: "2024-06-11", inbound: 300, outbound: 250 },
    { date: "2024-06-12", inbound: 280, outbound: 220 },
    { date: "2024-06-13", inbound: 260, outbound: 190 },
    { date: "2024-06-14", inbound: 320, outbound: 280 },
]

// Fixed Colors for Volume
const volumeConfig = {
    inbound: { label: "Inbound", color: "#8b5cf6" }, // purple-500
    outbound: { label: "Outbound", color: "#06b6d4" }, // cyan-500
} satisfies ChartConfig

// Data for Sentiment (Pie) - Fixed Colors
const sentimentData = [
    { name: "Positive", value: 65, color: "#22c55e" }, // green-500
    { name: "Neutral", value: 25, color: "#94a3b8" }, // slate-400
    { name: "Negative", value: 10, color: "#ef4444" }, // red-500
]

const sentimentConfig = {
    positive: { label: "Positive", color: "#22c55e" },
    neutral: { label: "Neutral", color: "#94a3b8" },
    negative: { label: "Negative", color: "#ef4444" },
} satisfies ChartConfig

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col h-full p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">Comprehensive insights driven by voice AI analysis.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="7d">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24h">Last 24h</SelectItem>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 3 months</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {overviewData.map((card, index) => (
                    <Card key={index} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                {card.trend === "up" ? (
                                    <IconArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                                ) : (
                                    <IconArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                                )}
                                <span className={card.trend === "up" ? "text-green-500" : "text-red-500"}>
                                    {card.change}
                                </span>
                                <span className="ml-1">vs last period</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Main Volume Chart (2/3 width) */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Call Traffic</CardTitle>
                        <CardDescription>Inbound vs Outbound calls over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={volumeConfig} className="aspect-auto h-[350px] w-full">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="fillInbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={volumeConfig.inbound.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={volumeConfig.inbound.color} stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="fillOutbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={volumeConfig.outbound.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={volumeConfig.outbound.color} stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area
                                    dataKey="outbound"
                                    type="monotone"
                                    fill="url(#fillOutbound)"
                                    stroke={volumeConfig.outbound.color}
                                    stackId="1"
                                />
                                <Area
                                    dataKey="inbound"
                                    type="monotone"
                                    fill="url(#fillInbound)"
                                    stroke={volumeConfig.inbound.color}
                                    stackId="1"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* AI Executive Summary - Redesigned */}
                <Card className="flex flex-col h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IconBrain className="h-5 w-5 text-primary" />
                            AI Insights
                        </CardTitle>
                        <CardDescription>Real-time fleet intelligence</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto pr-2">
                        <div className="space-y-4">
                            {aiInsights.map((insight, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${insight.border} ${insight.bg} transition-colors`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 p-1 rounded-full bg-background ${insight.color}`}>
                                            <insight.icon className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className={`text-sm font-semibold ${insight.color}`}>{insight.title}</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {insight.description}
                                            </p>
                                            <div className="pt-2">
                                                <Badge variant="outline" className="text-[10px] bg-background/50 backdrop-blur-sm border-0 shadow-sm">
                                                    Rec: {insight.action}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Conversion Funnel */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Conversion Funnel</CardTitle>
                        <CardDescription>Call progression to success</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={funnelConfig} className="h-[300px] w-full">
                            <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} opacity={0.3} />
                                <YAxis
                                    dataKey="stage"
                                    type="category"
                                    tickLine={false}
                                    axisLine={false}
                                    width={110}
                                    style={{ fontSize: '11px', fontWeight: 500 }}
                                />
                                <XAxis type="number" hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Bar dataKey="count" layout="vertical" radius={4}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Sentiment Analysis */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Sentiment Breakdown</CardTitle>
                        <CardDescription>Emotional tone of conversations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={sentimentConfig} className="mx-auto aspect-square max-h-[300px]">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={sentimentData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="mt-4 flex justify-center gap-4 text-sm text-foreground">
                            {sentimentData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span>{item.name} ({item.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Common Questions List */}
                <Card className="col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Top Questions</CardTitle>
                        <CardDescription>Customer inquiries</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {commonQuestions.slice(0, 4).map((q, i) => (
                                <div key={i} className="flex flex-col space-y-1 p-3 rounded-lg border bg-muted/20">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm truncate pr-2">{q.question}</span>
                                        <Badge variant="secondary" className="text-[10px] h-5">{q.count}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                        <span>Sentiment:</span>
                                        <span className={
                                            q.sentiment === 'positive' ? 'text-green-500 font-medium' :
                                                q.sentiment === 'negative' ? 'text-red-500 font-medium' :
                                                    'text-yellow-500 font-medium'
                                        }>
                                            {q.sentiment.charAt(0).toUpperCase() + q.sentiment.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Call Analysis */}
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-0">
                    <div>
                        <CardTitle>Recent Call Analysis</CardTitle>
                        <CardDescription>Detailed metadata and AI summary for recent interactions</CardDescription>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-[200px]">
                            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search calls..."
                                className="pl-9 h-9"
                            />
                        </div>

                        {/* Agent Filter */}
                        <Select defaultValue="all-agents">
                            <SelectTrigger className="h-9 w-[130px]">
                                <SelectValue placeholder="Agent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-agents">All Agents</SelectItem>
                                <SelectItem value="sales-bot">Sales Bot Alpha</SelectItem>
                                <SelectItem value="support-bot">Support Agent Beta</SelectItem>
                                <SelectItem value="survey-bot">Survey Bot Gamma</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Sentiment Filter */}
                        <Select defaultValue="all-sentiment">
                            <SelectTrigger className="h-9 w-[130px]">
                                <SelectValue placeholder="Sentiment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-sentiment">All Sentiment</SelectItem>
                                <SelectItem value="positive">Positive</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="negative">Negative</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Duration Filter */}
                        <Select defaultValue="any-duration">
                            <SelectTrigger className="h-9 w-[130px]">
                                <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any-duration">Any Duration</SelectItem>
                                <SelectItem value="short">&lt; 1 min</SelectItem>
                                <SelectItem value="medium">1-5 mins</SelectItem>
                                <SelectItem value="long">&gt; 5 mins</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead className="w-[180px]">Customer</TableHead>
                                <TableHead className="min-w-[300px] max-w-[600px]">AI Summary</TableHead>
                                <TableHead className="w-[120px]">Sentiment</TableHead>
                                <TableHead className="w-[150px] text-right">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentCalls.map((call) => (
                                <TableRow key={call.id} className="align-top">
                                    <TableCell className="py-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border hover:bg-primary/10 hover:text-primary mt-1">
                                            <IconPlayerPlay className="h-3.5 w-3.5" />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="font-medium py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-semibold text-foreground">{call.customer}</span>
                                            <span className="text-xs text-muted-foreground font-normal">{call.date}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 max-w-[600px] whitespace-normal">
                                        <p className="text-sm leading-relaxed text-foreground/90">
                                            {call.summary}
                                        </p>
                                        <div className="flex gap-1.5 flex-wrap mt-2">
                                            {call.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-secondary/50 text-secondary-foreground font-normal border-0">{tag}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md w-fit border text-xs font-medium mt-0.5
                                    ${call.sentiment === 'positive' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50' :
                                                call.sentiment === 'negative' ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/50' :
                                                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/50'}
                                `}>
                                            {call.sentiment === "positive" && <IconThumbUp className="h-3 w-3" />}
                                            {call.sentiment === "negative" && <IconThumbDown className="h-3 w-3" />}
                                            {call.sentiment === "neutral" && <IconMinus className="h-3 w-3" />}
                                            <span className="capitalize">{call.sentiment}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-sm font-medium tabular-nums">{call.duration}</span>
                                            <span className="text-xs text-muted-foreground">{call.agent}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    )
}
