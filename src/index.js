import searchImagesAPI from "./js/searchImagesAPI";
import { Notify } from "notiflix";
import renderImage from "./js/renderImage";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchImg = new searchImagesAPI();
const form = document.querySelector("#search-form");
const input = document.querySelector("[name='searchQuery']");
const loadMore = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", onFormSubmit)
loadMore.addEventListener("click", onLoadMore)

loadMoreHide()

let lightbox = new SimpleLightbox(".photo-card a", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
});


function onFormSubmit(event) {
    event.preventDefault()

    const inputWord = input.value;
    searchImg.setSearchWord(inputWord)

    clearGallery()
    searchImg.resetPage()

    if (inputWord) {
        searchImg.searchImages()
        .then(dataImages => {
            let imagesHits = dataImages.hits;

            lightbox.refresh()

            loadMoreShow()

            imagesHits.map(image => {
                renderImage(image)
            })

            Notify.success(`Hooray! We found ${dataImages.totalHits} images.`)
        })
        .catch(() => {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        })
        
    } else (
        Notify.info("Please enter a word for search")
    )
}

function onLoadMore() {
    searchImg.searchImages()
    .then(dataImages => {
        let imagesHits = dataImages.hits;

        loadMoreShow()
        lightbox.refresh()

        imagesHits.map(image => {
            renderImage(image)
        })

        Notify.success(`Hooray! We found ${dataImages.totalHits} images.`)
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    })
    .catch(() => {
        Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreHide()
    })
}


function loadMoreHide() {
    loadMore.style.display = "none"
}

function loadMoreShow() {
    loadMore.style.display = "block"
}

function clearGallery() {
    gallery.innerHTML = ""
}





