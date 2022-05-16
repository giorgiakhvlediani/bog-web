import { base } from "./base.js";

 export class gifsSection extends base {

    gifList = []
  
    constructor(id) {
      super(id)
    }
  
  
    set setGifList(data) {
      this.gifList = data;
      console.log(data);
    }
  
  
    renderGifItem(obj) {
      return `
      <div class="gif-box">
      <img class="img" src="${obj.images.original.url}">
      <h6>Rating:${obj.rating}</h6>
    </div>
      `
    }
  
    renderGifItemsList(list) {
      return list.map((obj) => {
        return this.renderGifItem(obj);
      });
    }
  
  
    render() {
      let content = this.renderGifItemsList(this.gifList).join("");
      this.setHtmlContent(content);
    }
  }