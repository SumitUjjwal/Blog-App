// NAV ELEMENTS
// const nav_login_btn = document.getElementById("nav-login");

// const user = JSON.parse(localStorage.getItem("user"));
// const info = JSON.parse(localStorage.getItem("userInfo"));

// let cookies = document.cookie;
// console.log(cookies);
if(info){
    nav_login_btn.innerText = info.user;
    nav_login_btn.href = "./index.html";
    nav_reg_btn.innerText = "Log Out";
}

// adding event handlers for login button
nav_login_btn.addEventListener("click", () => {
    if (!info) {
        main_body.innerHTML = "";
        main_body.innerHTML = `
        <div id="main-login" class="main-login">
            <p>Log in to <span class="nav-logo"><a href="./index.html">The Poets</a></span></p>
            <form action="" id="form-login">
                <input type="email" placeholder="Enter Your Email" id="input-email" class="input-email" required>
                <input type="password" placeholder="Password" id="input-password" class="input-password" required>
                <button type="submit" id="submit-btn">Login</button>
            </form>
        </div>
    `;

        const form = document.getElementById("form-login");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            document.getElementById("submit-btn").innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Creating account</span>`;
            const email = document.getElementById("input-email");
            const password = document.getElementById("input-password");
            let userInfo = {
                email: email.value,
                password: password.value
            };
            let request = await fetch(`${base_url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            let response = await request.json();
            console.log(response);
            document.getElementById("submit-btn").innerHTML = `Login`;
            if (response.user) {
                localStorage.setItem("userInfo", JSON.stringify(response));
                // localStorage.setItem("user", JSON.stringify(response.user));
                // localStorage.setItem("user", JSON.stringify(response.user));
                window.location.href = "./index.html";
                // const token = Cookies.get();
                // console.log(token);
                
                nav_login_btn.innerText = info.user;
                console.log("Success");
            }
            alert(response.msg);
        })
    }
    else{
        window.location.href = "./index.html";
    }
})
