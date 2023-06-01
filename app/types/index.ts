import { User } from '@prisma/client'

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}