const sendAbstractData = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const title = document.getElementById("title").value;
    const abstractFile = document.getElementById("abstractFile").files[0];

    if (name == "" || phone == "" || email == "" || title == "") {
        alert("All fields in contact form are required.");
        return;
    }
    if (abstractFile==null) {
        alert("Please upload file before submitting.");
        return;
    }
    if(abstractFile.size>1000000){
        alert("Please upload file less then 1mb.");
        return
    }
    const sendMessageLoader = document.getElementById("sendMessageLoader");
    const sendMessageText = document.getElementById("sendMessageText");
    sendMessageLoader.style.display = "block";
    sendMessageText.style.display = "none";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("abstractFile", abstractFile);

    const requestOptions = {
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data"
        // },
        body: formData
    }
    const url = "http://localhost:3000/api/abstractSubmission";
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    sendMessageLoader.style.display = "none";
                    sendMessageText.style.display = "block";
                    alert("Thank you! Your file has been sent successfully.");
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