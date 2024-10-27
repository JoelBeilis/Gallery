document.addEventListener("DOMContentLoaded", () => {
    const equipmentBoxes = document.querySelectorAll(".equipment-box");

    const handleScroll = () => {
        equipmentBoxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (boxTop < windowHeight - 50) {
                box.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check in case boxes are already in view
});