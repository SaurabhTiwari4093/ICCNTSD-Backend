const sendRegistrationData = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const presentDesignation = document.getElementById("presentDesignation").value;
    const nameOfInstitute = document.getElementById("nameOfInstitute").value;
    const titleOfAbstract = document.getElementById("titleOfAbstract").value;
    const modeOfPresentation = document.getElementById("modeOfPresentation").value;
    const correspondenceAddress = document.getElementById("correspondenceAddress").value;
    const mobileNo = document.getElementById("mobileNo").value;
    const emailAddress = document.getElementById("emailAddress").value;
    const nameOfAccountholder = document.getElementById("nameOfAccountholder").value;
    const accountNo = document.getElementById("accountNo").value;
    const nameAndAddressOfBankBranch = document.getElementById("nameAndAddressOfBankBranch").value;
    const IFSCcode = document.getElementById("IFSCcode").value;
    const amountPaid = document.getElementById("amountPaid").value;
    const transactionIDno = document.getElementById("transactionIDno").value;
    const dateOfTransaction = document.getElementById("dateOfTransaction").value;
    const paymentFile = document.getElementById("paymentFile").files[0];
   
    if (name == "" || correspondenceAddress == "" || mobileNo == "" || emailAddress == "" || nameOfAccountholder=="" || accountNo=="" || nameAndAddressOfBankBranch=="" || IFSCcode=="" || amountPaid=="" || transactionIDno=="" || dateOfTransaction=="") {
        alert("* marked fields in form are required.");
        return;
    }
    if (paymentFile == null) {
        alert("Please upload receipt before submitting.");
        return;
    }
    if (paymentFile.size > 1000000) {
        alert("Please upload file less then 1mb.");
        return
    }
    const sendMessageLoader = document.getElementById("sendMessageLoader");
    const sendMessageText = document.getElementById("sendMessageText");
    sendMessageLoader.style.display = "block";
    sendMessageText.style.display = "none";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("presentDesignation", presentDesignation);
    formData.append("nameOfInstitute", nameOfInstitute);
    formData.append("titleOfAbstract", titleOfAbstract);
    formData.append("modeOfPresentation", modeOfPresentation);
    formData.append("correspondenceAddress", correspondenceAddress);
    formData.append("mobileNo", mobileNo);
    formData.append("emailAddress", emailAddress);
    formData.append("nameOfAccountholder", nameOfAccountholder);
    formData.append("accountNo", accountNo);
    formData.append("nameAndAddressOfBankBranch", nameAndAddressOfBankBranch);
    formData.append("IFSCcode", IFSCcode);
    formData.append("amountPaid", amountPaid);
    formData.append("transactionIDno", transactionIDno);
    formData.append("dateOfTransaction", dateOfTransaction);
    formData.append("paymentFile", paymentFile);

    const requestOptions = {
        method: "POST",
        body: formData
    }
    const url = "https://www.iccntsd.in/api/registration";
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    document.getElementById("registrationForm").reset();
                    sendMessageLoader.style.display = "none";
                    sendMessageText.style.display = "block";
                    alert("Thank you! Registration is successful.");
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