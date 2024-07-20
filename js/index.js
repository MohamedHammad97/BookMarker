let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let submit = document.querySelector("#submit")
let updateBtn = document.querySelector("#updateBtn")
let search = document.querySelector("#search")
let siteList;
let indexOfUpdateSite;

// DATA IN LOCAL STROGE
if (localStorage.getItem("siteList") == null) {
    siteList = [];
} else {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    display(siteList);
}

// ADD BOOK MARKER
submit.addEventListener("click", function submit() {
    if (validateUrl() == true) {
        let newURL = {
            name: siteName.value,
            url: siteURL.value,
        }
        siteList.push(newURL);
        display(siteList);
        clear(siteList);
        localStorage.setItem("siteList", JSON.stringify(siteList))
    } else {
        alert(`
        Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`)
    }
})


// DISPLAY BOOK MARKER LIST FUNCTION
function display(list) {
    var cartona = ``
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
                    <td>${[i + 1]}</td>
                    <td>${[list[i].name]}</td>
                    <td><a href="${[list[i].url]}" target="_blank"><button  class="btn btn-success btn-sm "><i class="icofont-eye pe-2"></i>Visit</button></a></td>
                    <td><button onclick ="updateSite(${i})" class="btn btn-warning btn-sm">Update</button></td>
                    <td><button onclick = "deleteURL(${[i]})" class="btn btn-danger btn-sm"><i class="icofont-ui-delete pe-2"></i>Delete</button></td>
                </tr>`
    }

    document.getElementById("tBody").innerHTML = cartona;
}

// CLEAR FORM FUNCTION
function clear() {
    siteName.value = ""
    siteURL.value = ""
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
}

// UPDATE BOOK MARKER 
updateBtn.addEventListener("click", function update() {
    document.getElementById("submit").classList.replace("d-none", "d-block");
    document.getElementById("updateBtn").classList.add("d-none");
    let newURL = {
        name: siteName.value,
        url: siteURL.value
    }
    siteList[indexOfUpdateSite] = newURL
    display(siteList)
    localStorage.setItem("siteList", JSON.stringify(siteList))
    clear()
});

function updateSite(i) {
    document.getElementById("updateBtn").classList.replace("d-none", "d-block");
    document.getElementById("submit").classList.add("d-none");
    siteName.value = siteList[i].name
    siteURL.value = siteList[i].url
    indexOfUpdateSite = i;
}

// DELETE PRODUCT FUNCTION
function deleteURL(index) {
    siteList.splice(index, 1)
    localStorage.setItem("siteList", JSON.stringify(siteList))
    display(siteList)
}

// SEARCH BOOK MARKER
search.addEventListener("input", function search() {
    let searchValue = document.querySelector("#search").value

    let foundedItem = [];
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(searchValue.toLowerCase()) == true) {
            foundedItem.push(siteList[i])
            siteList[i].newName = siteList[i].name.toLowerCase().replace(searchValue.toLowerCase(), `<span class="text-danger">${searchValue}</span>`)
        }
    }
    display(foundedItem)
})

// VALDIATION FOR BOOK MARKER NAME
siteName.addEventListener("input", function () {
    validNameUrl()
})

function validNameUrl() {
    var regex = /[A-Z]/g;
    if (regex.test(siteName.value) == true) {
        siteName.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongName").classList.add("d-none");
        return true
    } else {
        siteName.classList.add("is-invalid");
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
};

// VALDIATION FOR BOOK MARKER URL
siteURL.addEventListener("input", function () {
    validateUrl()
})

function validateUrl() {
    var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    if (regex.test(siteURL.value) == true) {
        siteURL.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongURL").classList.add("d-none");
        return true
    } else {
        siteURL.classList.add("is-invalid");
        document.getElementById("wrongURL").classList.remove("d-none");
        return false
    }
}
