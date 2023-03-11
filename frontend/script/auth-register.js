// // BASE URL
// const base_url = "http://localhost:8080";

// // NAV ELEMENTS
// const nav_reg_btn = document.getElementById("nav-register");
// const nav_login_btn = document.getElementById("nav-login");

// // MAIN BODY
// const main_body = document.getElementsByTagName("main")[0];

// const user = JSON.parse(localStorage.getItem("user"));

// if(user){
//     nav_login_btn.innerText = user;
//     nav_reg_btn.innerText = "Log Out";
// }
if(info){
    nav_login_btn.innerText = info.user;
    nav_login_btn.href = "./index.html";
    nav_reg_btn.innerText = "Log Out";
}

// adding event handlers for register button
nav_reg_btn.addEventListener("click", () => {
    const login_box = document.querySelector(".login-container");
    const register_box = document.querySelector(".reg-container");
    register_box.style.display = "block";
    login_box.style.display = "none";
    if (!info) {
    //     main_body.innerHTML = "";
    //     main_body.innerHTML = `
    //     <div id="main-register" class="main-register">
    //         <p>Welcome to <span class="nav-logo"><a href="./index.html">The Poets</a></span></p>
    //         <form action="" id="form-register">
    //             <input type="text" placeholder="Enter Your Name" id="input-name" class="input-name" required>
    //             <input type="email" placeholder="Enter Your Email" id="input-email" class="input email" required>
    //             <input type="password" placeholder="Password" id="input-password" class="input password" required>
    //             <div id="message">
    //                 <p id="letter" class="invalid"> • A <strong>lowercase</strong> letter</p>
    //                 <p id="capital" class="invalid"> • An <strong>uppercase</strong> letter</p>
    //                 <p id="number" class="invalid"> • A <strong>number</strong></p>
    //                 <p id="splChar" class="invalid"> • A <strong>special character</strong></p>
    //                 <p id="lengths" class="invalid"> • Minimum <strong>8 characters</strong></p>
    //             </div>
    //             <input type="password" placeholder="Confirm Password" id="input-conf-password" class="input-conf-password" required>
    //             <button type="submit" id="submit-btn">Create an account</button>
    //         </form>
    //     </div>
        
    // `;

        const form = document.getElementById("form-register");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            document.getElementById("submit-btn").innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Creating account</span>`;
            const name = document.getElementById("input-name");
            const email = document.getElementById("input-email");
            const password = document.getElementById("input-password");
            const confirmPassword = document.getElementById("input-conf-password");
            if (password.value != confirmPassword.value) {
                confirmPassword.value = "";
                confirmPassword.placeholder = "Password Mismatch";
                confirmPassword.focus();
            }
            else if (!isValid()) {
                console.log("Password is not valid");
                password.focus();
            }
            else {
                let userInfo = {
                    fullName: name.value,
                    email: email.value,
                    password: password.value
                };
                let request = await fetch(`${base_url}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                })
                let response = await request.json();
                document.getElementById("submit-btn").innerHTML = `Create an account`;
                alert(response.msg);
                window.location.reload();
            }

        })

        const password = document.getElementById("input-password");
        console.log(password.value, password.value.length);

        password.onfocus = function () {
            document.getElementById("message").style.display = "block";
        }

        // When the user clicks outside of the password field, hide the message box
        password.onblur = function () {
            document.getElementById("message").style.display = "none";
        }

        // When the user starts to type something inside the password field
        let isLowerCase = false, isUpperCase = false, isNumbers = false, isSpecialCharacter = false, isLength = false;
        password.onkeyup = function () {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if (password.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
                isLowerCase = true;
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if (password.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
                isUpperCase = true;
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if (password.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
                isNumbers = true;
            }

            // Validate special characters
            var specialCharacter = /[!@#$%^&*()_+={}\[\]|\\:;'<>,.?\/]/;
            if (password.value.match(specialCharacter)) {
                splChar.classList.remove("invalid");
                splChar.classList.add("valid");
            } else {
                splChar.classList.remove("valid");
                splChar.classList.add("invalid");
                isSpecialCharacter = true;
            }

            // Validate length
            if (password.value.length >= 8) {
                lengths.classList.remove("invalid");
                lengths.classList.add("valid");
                isLength = true;
            } else {
                lengths.classList.remove("valid");
                lengths.classList.add("invalid");
            }
        }

        function isValid() {
            if (letter.classList.value == "valid" && capital.classList.value == "valid" && number.classList.value == "valid" && splChar.classList.value == "valid" && lengths.classList.value == "valid") {
                return true;
            }
            else {
                return false;
            }
        }
    }
    // else{
    //     localStorage.clear();
    //     confirm("Are you sure?");
    //     if(confirm){
    //         alert("Logged out successfully");
    //         window.location.href = "./index.html";
    //     }
    // }

}
)

