export interface SendEmailRequest {
    to: string;
    subject: string;
    text?: string;
    html?: string;

    attachment?: {
        filename: string;
        content: Buffer;
    };
}