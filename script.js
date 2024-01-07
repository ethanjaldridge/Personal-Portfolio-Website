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

    const updateScrollbar = (clickX) => {
        const trackRect = healthScrollTrack.getBoundingClientRect();
        const thumbWidth = healthScrollThumb.offsetWidth;
        const maxThumbPosition = trackRect.width - thumbWidth;
        
        const newThumbPosition = Math.max(0, Math.min(maxThumbPosition, clickX - trackRect.left - thumbWidth / 2));
        const scrollPosition = (newThumbPosition / maxThumbPosition) * maxScrollLeft;

        healthScrollThumb.style.left = `${newThumbPosition}px`;
        imgList.scrollLeft = scrollPosition;
    };

    healthScrollTrack.addEventListener("mousedown", (e) => {
        updateScrollbar(e.clientX);

        const handleMouseMove = (e) => {
            updateScrollbar(e.clientX);
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
};

/* Music Video Slider */

const initSlider2 = () => {
    const vidList = document.querySelector(".music-vid-list");
    const musicSlideButtons = document.querySelectorAll(".music-slide-button");
    const vidListChildren = [...vidList.children];
    const vidWidth = vidList.querySelector(".music-vid").offsetWidth;

    let vidPerView = Math.round(vidList.offsetWidth / vidWidth)
    
    musicSlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "music-prev-slide" ? -1 : 1;
            const scrollAmount = vidList.clientWidth * direction;
            vidList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
  
    vidListChildren.slice(-vidPerView).reverse().forEach(vid => {
        vidList.insertAdjacentHTML("afterbegin", vid.outerHTML);
    });

    vidListChildren.slice(0, vidPerView).forEach(vid => {
        vidList.insertAdjacentHTML("beforeend", vid.outerHTML);
    });

    const infiniteScroll = () => {
        if (vidList.scrollLeft === 0) {
            vidList.classList.add("no-transition");
            vidList.scrollLeft = vidList.scrollWidth - (2 * vidList.offsetWidth);
            vidList.classList.remove("no-transition");
        } else if (vidList.scrollLeft === vidList.scrollWidth - vidList.offsetWidth) {
            vidList.classList.add("no-transition");
            vidList.scrollLeft = vidList.offsetWidth;
            vidList.classList.remove("no-transition");
        }
    };

    vidList.addEventListener("scroll", infiniteScroll);
};


/* Art Image Slider */

const initSlider3 = () => {
    const imgList = document.querySelector(".art-img-list");
    const artSlideButtons = document.querySelectorAll(".art-slide-button");
    const imgListChildren = [...imgList.children];
    const imgWidth = imgList.querySelector(".art-img").offsetWidth;

    let imgPerView = Math.round(imgList.offsetWidth / imgWidth)
    
    artSlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "art-prev-slide" ? -1 : 1;
            const scrollAmount = imgList.clientWidth * direction;
            imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
  
    imgListChildren.slice(-imgPerView).reverse().forEach(img => {
        imgList.insertAdjacentHTML("afterbegin", img.outerHTML);
    });

    imgListChildren.slice(0, imgPerView).forEach(img => {
        imgList.insertAdjacentHTML("beforeend", img.outerHTML);
    });

    const infiniteScroll = () => {
        if (imgList.scrollLeft === 0) {
            imgList.classList.add("no-transition");
            imgList.scrollLeft = imgList.scrollWidth - (2 * imgList.offsetWidth);
            imgList.classList.remove("no-transition");
        } else if (imgList.scrollLeft === imgList.scrollWidth - imgList.offsetWidth) {
            imgList.classList.add("no-transition");
            imgList.scrollLeft = imgList.offsetWidth;
            imgList.classList.remove("no-transition");
        }
    };

    imgList.addEventListener("scroll", infiniteScroll);

    /* Swiping */

    let isDragStart = false, prevPageX, prevScrollLeft;

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = imgList.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        imgList.classList.add("dragging");
        let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        imgList.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }

    const dragStop = () => {
        isDragStart = false;
        imgList.classList.remove("dragging");
    }

    imgList.addEventListener("mousedown", dragStart);
    imgList.addEventListener("touchstart", dragStart);

    imgList.addEventListener("mousemove", dragging);
    imgList.addEventListener("touchmove", dragging);

    imgList.addEventListener("mouseup", dragStop);
    imgList.addEventListener("touchend", dragStop);
};

window.addEventListener("load", initSlider1);
window.addEventListener("load", initSlider2);
window.addEventListener("load", initSlider3);