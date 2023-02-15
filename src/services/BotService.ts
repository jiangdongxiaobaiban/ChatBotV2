import { Data, MessageType } from "./Types";
import { DataSet, WebDataSet, WikiDataSet } from "./DataSet";
import { WikiService } from "./WikiService";
import { MessageService } from "./MessageService";

export class BotService {
    static delayMsg(msg: string, server = "Bot", sec: number = 1000) {
        return new Promise<MessageType>(
            (resolve: Function, reject: Function) => {
                setTimeout(() => {
                    resolve(MessageService.createAgentMsg(msg, server));
                }, sec);
            },
        );
    }

    static openWebpage(weburl: string, search: string, sec: number = 2000) {
        setTimeout(() => {
            window.open("//" + weburl + search, "_blank");
        }, sec);
    }

    static startChat() {
        return this.delayMsg("Hi, How can I help you today?");
    }

    static async getAnswer(question: string) {
        question = question.replaceAll(".", "");
        question = question.replaceAll("!", "");
        question = question.replaceAll("?", "");
        question = question.trim();
        question = question.toLowerCase();

        //#region DataSet
        for (let i = 0; i < DataSet.length; i++) {
            const x: Data = DataSet[i];
            if (x.q.includes(question)) {
                if (i == 0) return this.delayMsg(x.a[0], "Developer");
                const index = Math.floor(Math.random() * x.a.length);
                return this.delayMsg(x.a[index]);
            }
        }
        //#endregion

        //#region WikiDataset
        for (let i = 0; i < WikiDataSet.length; i++) {
            const x: Data = WikiDataSet[i];

            for (let i = 0; i < x.q.length; i++) {
                if (question.startsWith(x.q[i])) {
                    const search = question.split(x.q[i])[1].trim();
                    const ans = await WikiService.fetchData(search);
                    if (ans) return this.delayMsg(ans, "Wiki");
                    else {
                        this.openWebpage("google.com/search?q=", search);
                        return this.delayMsg("Let me check online...", "Web");
                    }
                }
            }
        }
        //#endregion

        //#region WebDataSet
        for (let i = 0; i < WebDataSet.length; i++) {
            const x: Data = WebDataSet[i];

            if (i == 0) {
                // Google Search
                for (let i = 0; i < x.q.length; i++) {
                    if (question.startsWith(x.q[i])) {
                        const search = question.split(x.q[i])[1].trim();
                        this.openWebpage("google.com/search?q=", search);

                        const index = Math.floor(Math.random() * 2);
                        return this.delayMsg(x.a[index], "Web");
                    }
                }
            }

            let search: string = question;

            if (WebDataSet[i].q.includes(question)) {
                let weburl = "google.com/search?q=";

                if (i == 1) search = "order food online";
                if (i == 2) search = "book movie";
                if (i == 3) search = "stream online";
                if (i == 4) {
                    weburl = "netflix.com";
                    search = "";
                }

                const x: Data = WebDataSet[i];
                this.openWebpage(weburl, search);

                const index = Math.floor(Math.random() * 2);
                console.log(index);
                return this.delayMsg(x.a[index], "Web");
            }
        }
        //#endregion

        return this.delayMsg("Sorry, I could not understand you.");
    }
}
