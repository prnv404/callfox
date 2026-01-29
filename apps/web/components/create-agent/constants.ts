import {
    IconUser,
    IconBriefcase,
    IconGhost,
    IconPlane,
    IconShoppingBag,
    IconStethoscope,
    IconHome,
    IconHeadset,
    IconPhoneOutgoing,
    IconSchool
} from "@tabler/icons-react"

export const AGENT_TYPES = [
    {
        id: "blank",
        title: "Blank Agent",
        description: "Start from scratch with a clean slate.",
        icon: IconGhost,
    },
    {
        id: "personal",
        title: "Personal Assistant",
        description: "A helper for your daily tasks and scheduling.",
        icon: IconUser,
    },
    {
        id: "business",
        title: "Business Agent",
        description: "Specialized agents for specific industries.",
        icon: IconBriefcase,
    },
]

export const INDUSTRIES = [
    {
        id: "tourism",
        title: "Tourism & Travel",
        icon: IconPlane,
    },
    {
        id: "retail",
        title: "Retail & E-commerce",
        icon: IconShoppingBag,
    },
    {
        id: "real-estate",
        title: "Real Estate",
        icon: IconHome,
    },
    {
        id: "healthcare",
        title: "Healthcare",
        icon: IconStethoscope,
    },
    {
        id: "education",
        title: "Education",
        icon: IconSchool,
    },
]

export const USE_CASES: Record<string, { id: string; title: string; description: string; icon: any }[]> = {
    tourism: [
        { id: "customer-support", title: "Customer Support", description: "Handle inquiries about bookings and locations.", icon: IconHeadset },
        { id: "booking-assistant", title: "Booking Assistant", description: "Help customers book flights and hotels.", icon: IconPhoneOutgoing },
    ],
    retail: [
        { id: "customer-support", title: "Customer Support", description: "Answer product questions and return policies.", icon: IconHeadset },
        { id: "outbound-sales", title: "Outbound Sales", description: "Reach out to leads and close deals.", icon: IconPhoneOutgoing },
    ],
    "real-estate": [
        { id: "lead-qualification", title: "Lead Qualification", description: "Screen potential buyers and renters.", icon: IconPhoneOutgoing },
        { id: "scheduler", title: "Viewing Scheduler", description: "Coordinate property viewings.", icon: IconHeadset },
    ],
    healthcare: [
        { id: "appointment-booking", title: "Appointment Booking", description: "Schedule patient visits.", icon: IconPhoneOutgoing },
        { id: "patient-info", title: "Patient Information", description: "Provide general health information.", icon: IconHeadset },
    ],
    education: [
        { id: "learning", title: "Learning & Development", description: "Employee training and onboarding.", icon: IconSchool },
        { id: "tutor", title: "AI Tutor", description: "Personalized tutoring for students.", icon: IconUser },
    ],
    // Fallbacks
    default: [
        { id: "customer-support", title: "Customer Support", description: "General support for your customers.", icon: IconHeadset },
        { id: "outbound-sales", title: "Outbound Sales", description: "Drive sales through proactive calls.", icon: IconPhoneOutgoing },
        { id: "learning", title: "Learning & Development", description: "Employee training and onboarding.", icon: IconSchool },
    ]
}
