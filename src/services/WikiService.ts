export class WikiService {
    static extractAPIContents = (json: any) => {
        const { pages } = json.query;
        return Object.keys(pages).map(id => pages[id].extract);
    };

    static async fetchData(subject: string) {
        const url =
            "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=true&explaintext=true&titles=" +
            subject;

        const resp = await fetch(url);
        const json = await resp.json();
        const contents: string[] = this.extractAPIContents(json);

        if (contents && contents.length && contents[0]) {
            let content: string = contents[0];

            if (content.length > 500) {
                content = content.substring(0, 500);

                let contentList: string[] = content.split(". ");
                if (contentList.length == 1) {
                    contentList = content.split("\n");
                    content = contentList
                        .slice(0, contentList.length - 1)
                        .join(". \n");
                } else
                    content = contentList
                        .slice(0, contentList.length - 1)
                        .join(". ");
                content += ". ";
            }
            return content;
        }
        return "";
    }
}
