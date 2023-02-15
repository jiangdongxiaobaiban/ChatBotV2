import React from "react";
import { FaRobot } from "react-icons/fa";

type Props = {
    resetChat: Function;
};

export default function Header(props: Props) {
    return (
        <div className="header-footer header">
            <FaRobot className="chat-icon" />
            <div className="header-content"> Your Chat Assistant</div>
            <button className="chat-btn" onClick={() => props.resetChat()}>
                RESET
            </button>
        </div>
    );
}
