const baseURL = "https://esdexamen.tk/b1devweb/api/"

const logo = document.querySelector("#logo")
const mainContainer = document.querySelector("#main")
const registerPageButton = document.querySelector("#btnShowSignUpPage")
const loginPageButton = document.querySelector("#btnShowLoginPage")
const displayUsernameNavBar = document.querySelector("#pseudo")
const logOut = document.querySelector("#logOut")

logo.addEventListener('click', ()=>{
    display(getHomeTemplate())
    registerPageButton.innerHTML = "SIGN UP"
    loginPageButton.innerHTML = "LOGIN"
    displayUsernameNavBar.innerHTML = ""
    logOut.innerHTML = ""
    token = ""
})
registerPageButton.addEventListener('click', displayRegisterPage)
loginPageButton.addEventListener('click', displayLoginTemplate)
logOut.addEventListener('click', ()=>{
    display(getHomeTemplate())
    registerPageButton.innerHTML = "SIGN UP"
    loginPageButton.innerHTML = "LOGIN"
    displayUsernameNavBar.innerHTML = ""
    logOut.innerHTML = ""
    token = ""
})

let userID = "7"
let username = ""
let token = ""

function clearMainContainer(){
    mainContainer.innerHTML= ""
}
function display(content){
    //vider la div principale
    clearMainContainer()
    //et y ajouter le contenu qu'elle recoit
    mainContainer.innerHTML=content
}
function getHomeTemplate(){
    let template = `
                    <div class="d-flex justify-content-center align-items-center welcome">
                        <h1 class="titreWelcome">Welcome on BLOG !</h1>
                    </div>
                   `
    return template
} //template Home
async function deletePost(msgId){
    let url = `${baseURL}posts/${msgId}`
    let fetchParams = {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    await fetch(url, fetchParams)
}//suprr un post





function CommentsPageTemplate(messages){

    let CommentTemplate = "";
    let sectionSendComment = "" + `<div class="d-flex align-items-center methodeEnvoieMessage">
                                    <input id="inputComment" class="border col-11" type="text" name="messageAEnvoye" id="" placeholder="send Comment">
                                    <button id="btnSendComment" class="btn bg-primary col-1 d-flex align-items-center justify-content-center"><i class="bi bi-send-fill"></i></button>
                                   </div>
                                  `;

    messages['hydra:member'].forEach(message=>{
        message.comments.forEach(comments=>{
            console.log(comments.content)
            CommentTemplate += templateComment(comments)
        })
    })


    let sectionMessagesTemplate = `
                                    <div id="conversation" class="d-flex flex-column">
                                        ${CommentTemplate}
                                    </div>
                                    <div>
                                        ${sectionSendComment}
                                    </div>
                                   `
    return sectionMessagesTemplate;
}
function templateComment(comment){
    let template = `
                    <div class="d-flex flex-column align-items-center bg-secondary templateMessage">
                        <div class="d-flex justify-content-between navMessage">
                            <p class="fs-5 fw-5"><strong>${comment.user.username}</strong></p>
                            <p class="fs-5"><strong>${comment.createdAt}</strong></p>
                        </div>
                        <div class="container">
                            <p class="text-center"><strong>${comment.content}</strong></p>
                        </div>
                    </div>
                    `
    return template
}
async function addComentaires(msgId, commentText){
    console.log(commentText)
    let url = `${baseURL}comment/${msgId}`
    let body = {
        content : messageText
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body : bodySerialise
    }
    await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{if (data.message == "Expired JWT Token"){console.log("pas de token")}})
    CommentsPageTemplate()
}//ajoute un com.




// fetch message api
async function getMessagesFromApi(){

    let url = `${baseURL}posts`
    let fetchParams = {
        method : 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    }
    return await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{
            //console.log(data['hydra:member'][0].user.username)
            return data
        })
}
// Template input message avec btnEnvoie avec creation (forEach message creation de template)
function getMessagesTemplate(posts){
    let messagesTemplate = ""
    let sectionSendMessage = "" + `<div class="d-flex align-items-center methodeEnvoieMessage">
                                    <input id="inputMessage" class="border col-11" type="text" name="messageAEnvoye" id="" placeholder="send message">
                                    <button id="btnSendMessage" class="btn bg-primary col-1 d-flex align-items-center justify-content-center"><i class="bi bi-send-fill"></i></button>
                                   </div>
                                  `;

    posts['hydra:member'].forEach(post=>{
        messagesTemplate+= getMessageTemplate(post)
    })



    let sectionMessagesTemplate = `
                                    <div id="conversation" class="d-flex flex-column">
                                        ${messagesTemplate}
                                    </div>
                                    <div>
                                        ${sectionSendMessage}
                                    </div>
                                   `
    return sectionMessagesTemplate;
}
// Template message
function getMessageTemplate(post){
    //<p class="">${message.author.username}, ${message.id}</p>
    if (post.user.username == username){
        let template1 = `
                    <div class="d-flex flex-column align-items-center bg-secondary templateMessage">
                        <div class="d-flex justify-content-between navMessage">
                            <p class="fs-5 fw-5"><strong>${post.user.username}</strong></p>
                            <p class="fs-5"><strong>${post.createdAt}</strong></p>
                        </div>
                        <div class="container">
                            <p class="text-center"><strong>${post.content}</strong></p>
                        </div>
                        <div class="d-flex justify-content-end navBtnEnVoirPlusMsg">
                        <button id="btnSupprMsg" isMsg class="btn" value="${post.id}"><i class="bi bi-trash-fill"></i></button>
                        <button class="btn btnEnVoirPlusMsg" ">En voir +</button>
                        </div>
                    </div>
                    `
        return template1
    }
    else{
        let template2 = `
                    <div class="d-flex flex-column align-items-center bg-secondary templateMessage">
                        <div class="d-flex justify-content-between navMessage">
                            <p class="fs-5 fw-5"><strong>${post.user.username}</strong></p>
                            <p class="fs-5"><strong>${post.createdAt}</strong></p>
                        </div>
                        <div class="container">
                            <p class="text-center"><strong>${post.content}</strong></p>
                        </div>
                        <div class="d-flex justify-content-end navBtnEnVoirPlusMsg">
                        <button class="btn btnEnVoirPlusMsg isMsg" value="${post.id}">En voir +</button>
                        </div>
                    </div>
                    `
        return template2
    }
}
// Appell de display avec content{getMessageTemplate{getMessagesFromApi}}, const, addEventListener Send Message
function displayMessagesPage(){
    getMessagesFromApi().then(messages=>{
        display(
            getMessagesTemplate(messages)
        )
        const textMessage = document.querySelector("#inputMessage")
        const btnSendMessage = document.querySelector("#btnSendMessage")
        btnSendMessage.addEventListener("click", ()=>{
            sendMessage(textMessage.value).then(displayMessagesPage())
            textMessage.value = ""
        })


        const btnsTrashMsg = document.querySelectorAll("#btnSupprMsg")
        const btnsEnVoirPlusMsg = document.querySelectorAll(".btnEnVoirPlusMsg")
        const idMsg = document.querySelector(".isMsg").value

        btnsTrashMsg.forEach(btnTrashMsg=>{
            btnTrashMsg.addEventListener('click', ()=>{
                deletePost(btnTrashMsg.value).then(displayMessagesPage())
            })
        })
        btnsEnVoirPlusMsg.forEach(btnEnVoirPlusMsg=>{
            btnEnVoirPlusMsg.addEventListener('click', ()=>{
                display(CommentsPageTemplate(messages))
                const inputComment = document.querySelector("#inputComment")
                const btnSendComment = document.querySelector("#btnSendComment")
                btnSendComment.addEventListener("click", ()=>{
                    addComentaires(inputComment.value)
                    inputComment.value = ""
                })
            })


        })

    })
}




//MARCHE BIEN


// Send Message
async function sendMessage(messageText){
    console.log(messageText)
    let url = `${baseURL}post`
    let body = {
        content : messageText
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body : bodySerialise
    }
    await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{if (data.message == "Expired JWT Token"){console.log("pas de token")}})
    displayMessagesPage()
}


function getRegisterTemplate(){
    let template = `
                    <div class="container d-flex align-items-center justify-content-center RegisterTemplatePage">
                        <div id="caseRegister" class="d-flex align-items-center flex-column border rounded m-3 bg-secondary">
                            <h2>Register : </h2>
                            <input id="inputRegisterUsername" class="d-flex text-center inputConnecting" type="text" id="regUsername" placeholder="Username">
                            <input id="inputRegisterPassword" class="d-flex text-center inputConnecting" type="password" id="regPassword" placeholder="Password">
                            <button id="submitRegisterBtn" class="btn bg-primary">submit</button>
                        </div>
                    </div>
                    `
    return template
}// Template Register
function displayRegisterPage(){
    display(getRegisterTemplate())

    const caseRegister = document.querySelector("#caseRegister")
    const inputRegisterUsername = document.querySelector("#inputRegisterUsername")
    const inputRegisterPassword = document.querySelector("#inputRegisterPassword")
    const submitRegisterBtn = document.querySelector("#submitRegisterBtn")

    submitRegisterBtn.addEventListener('click', ()=>{
        console.log("cliké")
        if (inputRegisterUsername.value == "" || inputRegisterPassword.value == ""){
            alert("mdp et username sont demander pour s'inscrire")
        }
        else{
            console.log("c okai")
            requeteNewUtulisateur(inputRegisterUsername.value, inputRegisterPassword.value)
        }
    })
}// Appell de display avec content{getRegisterTemplate}, const, addEventListener, test
async function requeteNewUtulisateur(username, password){
    let url = `${baseURL}registeruser`
    let body = {
        "username": username,
        "password" : password
    }
    await fetch(url, {method : "POST", body:JSON.stringify(body)})
        .then(reponse=>reponse.json())
        .then(data=>{
            if (data.message == "Expired JWT Token"){freshenerToken}
            if (data == "username already taken"){alert("Le nom d'utulisateur est déjà prit")}
            if (data == "try with 6+ chars for password"){alert("le mdp doit faire plus de 6 caractères !")}
            else{
                userID = data.id
                console.log(data.username)
                console.log(data.id)
            }

        })

}


function getLoginTemplate(){
    let template = `
                    <div class="container d-flex align-items-center justify-content-center LoginTemplatePage">
                        <div id="caseLogin" class="d-flex align-items-center flex-column border rounded m-3 bg-secondary">
                            <h2>Login : </h2>
                            <input id="inputLoginUsername" class="d-flex text-center inputConnecting" type="text" id="loginUsername" placeholder="Username">
                            <input id="inputLoginPassword" class="d-flex text-center inputConnecting" type="password" id="loginPassword" placeholder="Password">
                            <button id="loginRegisterBtn" class="btn bg-primary">Login</button>
                        </div>
                    </div>
                    `
    return template
}
function displayLoginTemplate(){
    display(getLoginTemplate())

    const caseLogin = document.querySelector("#caseLogin")
    const inputLoginUsername = document.querySelector("#inputLoginUsername")
    const inputLoginPassword = document.querySelector("#inputLoginPassword")
    const loginRegisterBtn = document.querySelector("#loginRegisterBtn")

    loginRegisterBtn.addEventListener('click', ()=>{
        if (inputLoginPassword.value == ""){
            alert("username et mdp sont requis pour se login")
        }
        else {
            username = inputLoginUsername.value
            requeteLoginUtulisateur(inputLoginUsername.value, inputLoginPassword.value).then(displayMessagesPage)
            console.log(inputLoginUsername.value, inputLoginPassword.value)
        }
    })
}
async function requeteLoginUtulisateur(username, password){
    let url = `${baseURL}login_check`
    let body = {
        "username": username,
        "password" : password
    }
    let headers = {
        'Content-type': 'application/json',
    }
    await fetch(url, {method : "POST", headers, body:JSON.stringify(body)})
        .then(response=>response.json())
        .then(data=>{
            token = data.token
            console.log("Voici le token : " + data.token)
            if (data.message == "Expired JWT Token"){freshenerToken}
            if (data.message == "Invalid credentials."){alert("username ou mdp incorect")}
            else{
                displayUsernameNavBar.innerHTML = username
                logOut.innerHTML = "logOut"
                registerPageButton.innerHTML = ""
                loginPageButton.innerHTML = ""
            }
        })
}