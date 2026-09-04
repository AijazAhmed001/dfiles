const USER_STORAGE_KEY = "efu-ai-user";

export function saveStoredUser(value: string) {
    localStorage.setItem(USER_STORAGE_KEY, value);
}

export function getStoredUser() {
    return localStorage.getItem(USER_STORAGE_KEY);
}

export function removeStoredUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}
