import { base } from "./base.js";

export class searchButtonSection extends base {

    //gifList = []
    ButtonList = []

    constructor(id) {
        super(id)
    }


    set setButtonList(data) {
        this.buttonList = this.submit(data);
        console.log(data, "esa");
    }

    submit(data) {
        if (data.length > 6) {
            data.shift();
        }
        return data;
    }

    renderButtons(obj) {
        return `
      <input type="button" class="bttn button" id="search-bttn"  value="${obj}" />
      `
    }

    renderButtonItemsList(list) {
        return list.map((obj) => {
            return this.renderButtons(obj);
        });
    }


    render() {
        let content = this.renderButtonItemsList(this.buttonList).join("");
        this.setHtmlContent(content);
    }
}