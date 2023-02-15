import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "../styles/Content.css";
import { MessageType } from "../services/Types";

//import * as img from "../images/typing.gif";
//const typing = img.default;
const typing = require("../images/typing.gif");

type Props = {
    showTyping: Boolean;
    msgList: MessageType[];
};

export default function Content(props: Props) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.msgList]);

    return (
        <div className="content">
            {props.msgList.map((msg: MessageType, i) => (
                <Message i={i} key={i} msg={msg} />
            ))}

            {props.showTyping && <img src={typing} className="typing-gif" alt="typing..." />}
            <div ref={endRef} />
        </div>
    );
}
