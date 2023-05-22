const sendContactUsData = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    if (name == "" || phone == "" || email == "" || subject == "" || message == "") {
        alert("All fields in contact form are required");
        return;
    }
    const sendMessageLoader = document.getElementById("sendMessageLoader");
    const sendMessageText = document.getElementById("sendMessageText");
    sendMessageLoader.style.display = "block";
    sendMessageText.style.display = "none";
    const formData = {
        "name": name,
        "phone": phone,
        "email": email,
        "subject": subject,
        "message": message
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = "http://localhost:3000/api/contact";
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    sendMessageLoader.style.display = "none";
                    sendMessageText.style.display = "block";
                    alert("Thank you! Your message has been sent successfully.");
                }
                else {
                    console.log(data);
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}