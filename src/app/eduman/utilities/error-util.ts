// src/app/utils/error-util.ts

/**
 * Utility function to format errors into strings.
 * Handles different types of errors and converts them to user-friendly messages.
 * @param error The error to format
 * @returns The formatted error message as a string
 */
export function formatError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else if (typeof error === 'object' && error !== null) {
        try {
            return JSON.stringify(error);
        } catch (e) {
            return 'An error occurred, but it could not be formatted.';
        }
    }
    return 'An unknown error occurred';
}

/**
 * Utility function to log errors.
 * Can be extended to send logs to an external logging service.
 * @param error The error to log
 */
export function logError(error: unknown): void {
    console.error('Logged Error:', formatError(error));
    // Extend this function to send logs to a logging service if needed
}
