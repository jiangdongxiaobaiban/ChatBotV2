import { MessageType } from "./Types";

export class MessageService {
    static createAgentMsg(text: string, server: string = "Bot") {
        const msg: MessageType = {
            sender: "Agent",
            text: text,
            time: Date.now(),
            server: server,
        };

        msg.server = server;
        return msg;
    }

    static createUserMsg(text: string, server: string = "User") {
        const msg: MessageType = {
            sender: "User",
            text: text,
            time: Date.now(),
            server: server,
        };

        msg.server = server;
        return msg;
    }
}
