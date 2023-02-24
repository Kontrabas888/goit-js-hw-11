const gallery = document.querySelector(".gallery");

export default function renderImage(image) {
    const {
        webformatURL, 
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    } = image

    const imageBlock = `
    <div class="photo-card">
        <a href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" width="300" height="200" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
        </div>
    </div>
    `
    gallery.insertAdjacentHTML("beforeend", imageBlock)
}