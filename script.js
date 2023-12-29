/* Health Image Slider */

const initSlider1 = () => {
    const imgList = document.querySelector(".health-img-list");
    const healthScrollTrack = document.querySelector(".health-scrollbar-track");
    const healthScrollThumb = document.querySelector(".health-scrollbar-thumb");
    const maxScrollLeft = imgList.scrollWidth - imgList.clientWidth;

    healthScrollThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = healthScrollThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = healthScrollTrack.getBoundingClientRect().width - healthScrollThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            healthScrollThumb.style.left = `${boundedPosition}px`;
            imgList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
};

/* Music Video Slider */



/* Art Image Slider */

const initSlider3 = () => {
    const imgList = document.querySelector(".art-img-list");
    const artSlideButtons = document.querySelectorAll(".art-slide-button");
    const gapWidth = 32;
    
    artSlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "art-prev-slide" ? -1 : 1;
            const scrollAmount = imgList.clientWidth * direction;
            imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const firstImgClone = imgList.firstElementChild.cloneNode(true);
    const lastImgClone = imgList.lastElementChild.cloneNode(true);
    imgList.appendChild(firstImgClone);
    imgList.insertBefore(lastImgClone, imgList.firstElementChild);

    const handleButtonClick = (direction) => {
        const imgWidth = (imgList.clientWidth - gapWidth) / 3;
        const scrollAmount = (imgWidth + gapWidth) * 3 * direction;
        imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });

        if (direction === 1 && imgList.scrollLeft + imgList.clientWidth >= imgList.scrollWidth) {
            imgList.scrollTo({ left: 0, behavior: "smooth" });
        } else if (direction === -1 && imgList.scrollLeft <= 0) {
            imgList.scrollTo({ left: imgList.scrollWidth - imgList.clientWidth, behavior: "smooth" });
        }
    };

    artSlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "art-prev-slide" ? -1 : 1;
            handleButtonClick(direction);
        });
    });
};

window.addEventListener("load", initSlider1);
window.addEventListener("load", initSlider3);