document.addEventListener("DOMContentLoaded", function() {

    const scroller = document.querySelector(".image-scroller");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const scrollItems = document.querySelectorAll(".scroll-item");

    if (!scroller) return;

    function getScrollAmount() {
        if (scrollItems.length > 0) {
            const scrollItem = scrollItems[0];
            const itemStyle = window.getComputedStyle(scrollItem);
            const gap = parseFloat(window.getComputedStyle(scroller).gap) || 32;
            return scrollItem.offsetWidth + gap;
        }
        return scroller.clientWidth * 0.8;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            scroller.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            scroller.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });
        });
    }
});