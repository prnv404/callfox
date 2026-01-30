import { pgTable, text, timestamp, boolean, integer, primaryKey, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// ============================================================================
// TABLES
// ============================================================================

// Users table
export const users = pgTable(
    "user",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => createId()),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        emailVerified: boolean("emailVerified").notNull().default(false),
        image: text("image"),
        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    },
    (table) => ({
        // Index for faster email lookups during login/signup
        emailIdx: index("user_email_idx").on(table.email),
        // Index for sorting/filtering by creation date
        createdAtIdx: index("user_created_at_idx").on(table.createdAt),
    })
);

// Sessions table
export const sessions = pgTable(
    "session",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => createId()),
        expiresAt: timestamp("expiresAt").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow(),
        ipAddress: text("ipAddress"),
        userAgent: text("userAgent"),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
    },
    (table) => ({
        // Index for faster token lookups during authentication
        tokenIdx: index("session_token_idx").on(table.token),
        // Index for finding all sessions for a user
        userIdIdx: index("session_user_id_idx").on(table.userId),
        // Index for cleaning up expired sessions
        expiresAtIdx: index("session_expires_at_idx").on(table.expiresAt),
    })
);

// Accounts table (for OAuth)
export const accounts = pgTable(
    "account",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => createId()),
        accountId: text("accountId").notNull(),
        providerId: text("providerId").notNull(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        accessToken: text("accessToken"),
        refreshToken: text("refreshToken"),
        idToken: text("idToken"),
        accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
        refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    },
    (table) => ({
        // Index for finding accounts by user
        userIdIdx: index("account_user_id_idx").on(table.userId),
        // Composite index for finding account by provider
        providerAccountIdx: index("account_provider_account_idx").on(
            table.providerId,
            table.accountId
        ),
    })
);

// Verification tokens
export const verifications = pgTable(
    "verification",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => createId()),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expiresAt").notNull(),
        createdAt: timestamp("createdAt").defaultNow(),
        updatedAt: timestamp("updatedAt").defaultNow(),
    },
    (table) => ({
        // Index for faster verification lookups
        identifierIdx: index("verification_identifier_idx").on(table.identifier),
        // Index for cleaning up expired verifications
        expiresAtIdx: index("verification_expires_at_idx").on(table.expiresAt),
    })
);

// ============================================================================
// RELATIONS
// ============================================================================

// User relations
export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
}));

// Session relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

// Account relations
export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

// ============================================================================
// TYPES
// ============================================================================

// Table types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;

// Relation types for queries with joins
export type UserWithRelations = User & {
    sessions?: Session[];
    accounts?: Account[];
};

export type SessionWithUser = Session & {
    user?: User;
};

export type AccountWithUser = Account & {
    user?: User;
};
