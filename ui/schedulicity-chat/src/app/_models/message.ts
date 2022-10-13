export class Message {
    id!: number;
    roomId!: number;
    userId!: number;
    userName: string | undefined;
    content: string | undefined;
    created: string | undefined;
    static id: number;
}