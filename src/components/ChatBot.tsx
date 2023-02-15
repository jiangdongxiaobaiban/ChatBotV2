import React, { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { MessageType } from "../services/Types";
import { MessageService } from "../services/MessageService";
import { BotService } from "../services/BotService";

type Props = {};

export default function ChatBot(props: Props) {
    const initMsgList: MessageType[] = [];

    const [msgList, setMsgList] = useState(initMsgList);
    const [showTyping, setShowTyping] = useState(false);

    const addMsg = (msg: MessageType) => {
        const newMsgList: MessageType[] = [...msgList];
        newMsgList.push(msg);
        setMsgList(newMsgList);
    };

    const resetChat = () => {
        setMsgList([]);
    };

    useEffect(() => {
        setShowTyping(true);
        if (!msgList || msgList.length == 0) {
            BotService.startChat().then((msg: MessageType) => {
                addMsg(msg);
                setShowTyping(false);
            });
        } else {
            const lastMsg: MessageType = msgList[msgList.length - 1];
            if (lastMsg.sender == "Agent") {
                setShowTyping(false);
                return;
            }

            BotService.getAnswer(lastMsg.text).then((msg: MessageType) => {
                addMsg(msg);
                setShowTyping(false);
            });
        }
    }, [msgList]);

    return (
        <div className="container">
            <Header resetChat={() => resetChat()} />
            <Content showTyping={showTyping} msgList={msgList} />
            <Footer sendMsg={(msg: MessageType) => addMsg(msg)} />
        </div>
    );
}
