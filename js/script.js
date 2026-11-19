document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
            });
        });
    }


    // =========================
    // FOOTER YEAR
    // =========================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =========================
    // HERO IMAGE SLIDER
    // =========================

    const slides = document.querySelectorAll(".hero-slide");
    const dotsContainer = document.getElementById("sliderDots");
    const nextButton = document.getElementById("nextSlide");
    const prevButton = document.getElementById("prevSlide");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        if (!slides.length) return;

        slides.forEach(slide => slide.classList.remove("active"));

        const dots = document.querySelectorAll(".slider-dot");
        dots.forEach(dot => dot.classList.remove("active"));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function createDots() {

        if (!dotsContainer || !slides.length) return;

        slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.className = "slider-dot";
            dot.setAttribute("aria-label", "Go to slide " + (index + 1));

            dot.addEventListener("click", function () {
                showSlide(index);
                restartSlider();
            });

            dotsContainer.appendChild(dot);
        });

        showSlide(0);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function restartSlider() {
        clearInterval(sliderInterval);

        sliderInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length) {

        createDots();

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                nextSlide();
                restartSlider();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                prevSlide();
                restartSlider();
            });
        }

        restartSlider();
    }


    // =========================
    // QUICK TRACKING FORM
    // =========================

    const quickTrackForm = document.getElementById("quickTrackForm");

    if (quickTrackForm) {

        quickTrackForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const number = document.getElementById("quickTrackingNumber")
                .value.trim();

            if (number) {
                window.location.href =
                    "tracking.html?number=" + encodeURIComponent(number);
            }
        });
    }


    // =========================
    // DEMONSTRATION SHIPMENT DATA
    // =========================

    const shipments = {

        AMD1001: {
            sender: "Amanda Delivery",
            origin: "Lagos, Nigeria",
            destination: "Abuja, Nigeria",
            status: "Out for Delivery",
            date: "18 November 2026",
            location: "Abuja Distribution Centre",

            stages: [
                {
                    title: "Package Received",
                    description: "Your package has been received.",
                    time: "16 November 2026"
                },
                {
                    title: "Shipment Processed",
                    description: "Your shipment has been processed.",
                    time: "16 November 2026"
                },
                {
                    title: "In Transit",
                    description: "Your package is on its way to Abuja.",
                    time: "17 November 2026"
                },
                {
                    title: "Out for Delivery",
                    description: "Your package is with our delivery agent.",
                    time: "18 November 2026"
                },
                {
                    title: "Delivered",
                    description: "Your package has been delivered.",
                    time: "Pending"
                }
            ],

            completed: 4
        },

        AMD1002: {
            sender: "Amanda Delivery",
            origin: "Lagos, Nigeria",
            destination: "Port Harcourt, Nigeria",
            status: "In Transit",
            date: "18 November 2026",
            location: "Transit Hub",

            stages: [
                {
                    title: "Package Received",
                    description: "Your package has been received.",
                    time: "17 November 2026"
                },
                {
                    title: "Shipment Processed",
                    description: "Your shipment has been processed.",
                    time: "17 November 2026"
                },
                {
                    title: "In Transit",
                    description: "Your shipment is moving to its destination.",
                    time: "18 November 2026"
                },
                {
                    title: "Out for Delivery",
                    description: "Waiting for dispatch.",
                    time: "Pending"
                },
                {
                    title: "Delivered",
                    description: "Delivery is not yet complete.",
                    time: "Pending"
                }
            ],

            completed: 3
        },

        AMD1003: {
            sender: "Amanda Delivery",
            origin: "Lagos, Nigeria",
            destination: "Ibadan, Nigeria",
            status: "Delivered",
            date: "18 November 2026",
            location: "Ibadan, Nigeria",

            stages: [
                {
                    title: "Package Received",
                    description: "Your package has been received.",
                    time: "15 November 2026"
                },
                {
                    title: "Shipment Processed",
                    description: "Your package has been processed.",
                    time: "15 November 2026"
                },
                {
                    title: "In Transit",
                    description: "Your package was transported to Ibadan.",
                    time: "16 November 2026"
                },
                {
                    title: "Out for Delivery",
                    description: "Your package was dispatched for delivery.",
                    time: "17 November 2026"
                },
                {
                    title: "Delivered",
                    description: "Your package has been successfully delivered.",
                    time: "18 November 2026"
                }
            ],

            completed: 5
        }
    };


    // =========================
    // TRACKING PAGE FUNCTION
    // =========================

    const trackingForm = document.getElementById("trackingForm");
    const trackingInput = document.getElementById("trackingNumber");
    const trackingResult = document.getElementById("trackingResult");

    function trackPackage(number) {

        if (!trackingResult) return;

        const trackingNumber = number.trim().toUpperCase();

        const shipment = shipments[trackingNumber];

        trackingResult.classList.add("show");

        if (!shipment) {

            trackingResult.innerHTML = `
                <div class="error-message">
                    <strong>Tracking number not found.</strong>
                    <p>Please check your tracking number and try again.</p>
                </div>
            `;

            return;
        }

        let timelineHTML = "";

        shipment.stages.forEach((stage, index) => {

            const isCompleted = index < shipment.completed;

            timelineHTML += `
                <div class="timeline-item ${isCompleted ? "completed" : ""}">
                    <h4>${stage.title}</h4>
                    <p>${stage.description}</p>
                    <small>${stage.time}</small>
                </div>
            `;
        });

        trackingResult.innerHTML = `

            <div class="result-header">

                <div>
                    <small>TRACKING NUMBER</small>
                    <h3>${trackingNumber}</h3>
                </div>

                <span class="status-badge">
                    ${shipment.status}
                </span>

            </div>

            <div class="package-info">

                <div>
                    <small>ORIGIN</small>
                    <strong>${shipment.origin}</strong>
                </div>

                <div>
                    <small>DESTINATION</small>
                    <strong>${shipment.destination}</strong>
                </div>

                <div>
                    <small>CURRENT LOCATION</small>
                    <strong>${shipment.location}</strong>
                </div>

                <div>
                    <small>LAST UPDATED</small>
                    <strong>${shipment.date}</strong>
                </div>

            </div>

            <h3 style="margin-bottom:25px;color:#073b3b;">
                Shipment Journey
            </h3>

            <div class="timeline">
                ${timelineHTML}
            </div>
        `;

    }


    if (trackingForm) {

        trackingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            trackPackage(trackingInput.value);

        });

        // Allow homepage tracking form to open with a number already entered.

        const urlParams = new URLSearchParams(window.location.search);
        const packageNumber = urlParams.get("number");

        if (packageNumber) {

            trackingInput.value = packageNumber;

            trackPackage(packageNumber);

        }
    }

});