if (info) {
    // console.log("User has been logged in", info);
    nav_reg_btn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to log out?")) {
            const token = info.normal_token;
            // console.log(token)
            const obj = { token }

            const request = await fetch(`${base_url}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            const response = await request.json();
            if (!response.error) {
                localStorage.clear();
                window.location.reload();
            }
            alert(response.msg);
        }
        else{
            window.location.reload();
        }
    })
}

