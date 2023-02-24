import axios from "axios";
export default class searchImagesAPI {
    constructor() {
        this.baseURL = "https://pixabay.com/api/";
        this.APIkey = "33842620-c45ae5552145e5cf17e045425";
        this.searchWord = "";
        this.imageType = "photo";
        this.orientation = "horizontal";
        this.safesearch = true;
        this.page = 1;
        this.perPage = 40;
    }

    async searchImages() {
        const requestURL = `${this.baseURL}?key=${this.APIkey}&q=${this.searchWord}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`;
        
        return await axios.get(requestURL)
            .then(response => {
                if (response.status !== 200 || response.data.hits.length === 0) {
                    throw new Error(response.status)
                }

                this.nextPage()

                return response.data
        })
    }

    nextPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    setSearchWord(value) {
        this.searchWord = value
    }
};