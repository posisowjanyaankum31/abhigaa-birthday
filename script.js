/* =========================================
   ABHIGAA BIRTHDAY WEBSITE
========================================= */


/* =========================================
   PARTICLES
========================================= */

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 45; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (6 + Math.random() * 10) + "s";

    particle.style.animationDelay =
        (Math.random() * 8) + "s";

    particle.style.transform =
        `scale(${0.5 + Math.random()})`;

    particleContainer.appendChild(particle);
}


/* =========================================
   ENVELOPE
========================================= */

const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

let websiteStarted = false;

seal.addEventListener("click", () => {

    if (websiteStarted) return;

    websiteStarted = true;

    envelope.classList.add("open");

    createSparkBurst();

    setTimeout(() => {

        document.body.classList.add("started");

        showScene("birthdayReveal");

        startMusic();

        setTimeout(() => {
            birthdaySparkEffect();
        }, 500);

    }, 1600);

});


/* =========================================
   SPARK BURST
========================================= */

function createSparkBurst() {

    const rect = seal.getBoundingClientRect();

    for (let i = 0; i < 35; i++) {

        const spark = document.createElement("span");

        spark.style.position = "fixed";
        spark.style.left = rect.left + rect.width / 2 + "px";
        spark.style.top = rect.top + rect.height / 2 + "px";

        spark.style.width = "4px";
        spark.style.height = "4px";
        spark.style.borderRadius = "50%";

        spark.style.background = "#f3c46d";

        spark.style.pointerEvents = "none";

        spark.style.zIndex = "9999";

        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 160;

        spark.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 500,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );

        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 1500);
    }
}


/* =========================================
   BIRTHDAY SPARK EFFECT
========================================= */

function birthdaySparkEffect() {

    const word = document.getElementById("birthdayWord");

    if (!word) return;

    const rect = word.getBoundingClientRect();

    for (let i = 0; i < 55; i++) {

        const spark = document.createElement("span");

        spark.style.position = "fixed";

        spark.style.left =
            rect.left + Math.random() * rect.width + "px";

        spark.style.top =
            rect.top + Math.random() * rect.height + "px";

        spark.style.width = "3px";
        spark.style.height = "3px";

        spark.style.background = "#f2c46e";
        spark.style.borderRadius = "50%";

        spark.style.zIndex = "9999";

        document.body.appendChild(spark);

        spark.animate(
            [
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${(Math.random() - .5) * 180}px,
                            ${(Math.random() - .5) * 180}px
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 1000 + Math.random() * 1000,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            spark.remove();
        }, 2200);
    }
}


/* =========================================
   SCENE NAVIGATION
========================================= */

const buttons =
    document.querySelectorAll(".continue-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
            button.getAttribute("data-target");

        if (!target) return;

        showScene(target);

    });

});


function showScene(sceneId) {

    const scenes =
        document.querySelectorAll(".scene");

    scenes.forEach(scene => {
        scene.style.display = "none";
    });

    const target =
        document.getElementById(sceneId);

    if (!target) return;

    target.style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {

        if (
            sceneId === "memories1" ||
            sceneId === "memories2"
        ) {
            revealPhotos(target);
        }

    }, 300);
}


/* =========================================
   PHOTO REVEAL
========================================= */

function revealPhotos(scene) {

    const photos =
        scene.querySelectorAll(".reveal-photo");

    photos.forEach((photo, index) => {

        setTimeout(() => {

            photo.classList.add("visible");

        }, index * 180);

    });
}


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


/*
   Browsers usually block autoplay.

   So music begins after the envelope click,
   which is a user interaction.
*/

function startMusic() {

    if (!music) return;

    music.volume = 0.35;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent = "♫";

        })
        .catch(() => {

            musicPlaying = false;

        });
}


musicButton.addEventListener("click", () => {

    if (!music) return;

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent = "♪";

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "♫";

            });

    }

});


/* =========================================
   SMALL PARALLAX EFFECT
========================================= */

document.addEventListener("mousemove", event => {

    const x =
        (event.clientX / window.innerWidth - .5);

    const y =
        (event.clientY / window.innerHeight - .5);

    document.querySelectorAll(".memory-photo")
        .forEach((photo, index) => {

            const strength =
                (index % 3 + 1) * 3;

            photo.style.marginLeft =
                `${x * strength}px`;

            photo.style.marginTop =
                `${y * strength}px`;

        });

});


/* =========================================
   TOUCH PARALLAX
========================================= */

document.addEventListener("touchmove", event => {

    const touch = event.touches[0];

    if (!touch) return;

    const x =
        (touch.clientX / window.innerWidth - .5);

    const y =
        (touch.clientY / window.innerHeight - .5);

    document.querySelectorAll(".memory-photo")
        .forEach((photo, index) => {

            const strength =
                (index % 3 + 1) * 2;

            photo.style.marginLeft =
                `${x * strength}px`;

            photo.style.marginTop =
                `${y * strength}px`;

        });

});


/* =========================================
   IMAGE FALLBACK
========================================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background =
            "linear-gradient(135deg,#4b1c27,#9b5260)";

        img.style.objectFit = "contain";

        img.style.padding = "20px";

        img.alt = "Add your photo here";

    });

});