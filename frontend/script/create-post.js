const create_post_btn = document.getElementById("create-post");
const create_icon = document.querySelector("create-post>span");
const popupOverlay = document.getElementById("create-post-popup");
const closeBtn = document.getElementById("close-btn");

create_post_btn.addEventListener("click", () => {
    const create_status = localStorage.getItem("create-status");
    console.log(create_status)
    if (create_status) {
        create_post_btn.innerHTML = `
        <span class="material-symbols-outlined">
            add
        </span>
        `;
        localStorage.removeItem("create-status");

    }
    else {
        create_post_btn.innerHTML = `
        <span class="material-symbols-outlined">
            close
        </span>
        `;
        localStorage.setItem("create-status", 1);
        popupOverlay.style.display = "block";
    }
})

closeBtn.addEventListener("click", function() {
  popupOverlay.style.display = "none";
  create_post_btn.innerHTML = `
        <span class="material-symbols-outlined">
            add
        </span>
        `;
        localStorage.removeItem("create-status");
});

// *****************************************
// const popupBtn = document.getElementById("popup-btn");
// const popupOverlay = document.getElementById("create-post-popup");


// popupBtn.addEventListener("click", function() {
//   popupOverlay.style.display = "block";
// });


// *******************************************