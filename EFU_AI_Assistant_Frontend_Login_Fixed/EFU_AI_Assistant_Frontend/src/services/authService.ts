import { User } from "../types/User";

export type LoginCredentials = {
    email: string;
    password: string;
};

export async function loginUser(
    credentials: LoginCredentials,
): Promise<User> {
    await new Promise((resolve) => window.setTimeout(resolve, 500));

    if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required.");
    }

    return {
        id: "efu-user-1",
        name: "EFU User",
        email: credentials.email,
        role: "Employee",
    };
}
