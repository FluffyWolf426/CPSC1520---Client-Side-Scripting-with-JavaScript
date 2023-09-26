var linksDiv = document.querySelector('.image-links');

linksDiv.addEventListener('click', imageLinkClickHandler);

function imageLinkClickHandler(evt) {
    var targetImage = document.querySelector('.target-image');

    // Prevent the default behaviour DOM2
    evt.preventDefault();

    // Relying on context
    // targetImage.src = this.href;

    targetImage.setAttribute('src', evt.target.href);

    // Prevent the default behaviour DOM0
    return false;
}