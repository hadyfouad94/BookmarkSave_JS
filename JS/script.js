var bookmarkName = document.getElementById("name");
var bookmarkUrl = document.getElementById("url");
var bookmarkList = [];
var btnSubmit = document.getElementById("btnSubmit");
var btnUpdate = document.getElementById("btnUpdate");
var currentIndex;
var localbookmarkcheck = localStorage.getItem("bookmarklist");
if (localbookmarkcheck !== null) {
  bookmarkList = JSON.parse(localbookmarkcheck);
  displayBookmark(bookmarkList);
}

function validateInput(value, type) {
  var regex = {
    name: /^[A-Za-z]{3,15}[0-9]{0,12}$/, // Validation for name (letters and numbers)
    url: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|org|net)\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/, // Validation for URL (with http/https)
  };
  if (value.trim() === "") {
    alert(`${type} cannot be empty!`);
    return false;
  }
  if (!regex[type].test(value)) {
    alert(`Invalid ${type}! Please ensure it matches the required format.`);
    return false; 
  }

  return true;
}

function addBookmark() {
  if (
    !validateInput(bookmarkName.value, "name") ||
    !validateInput(bookmarkUrl.value, "url")
  ) {
    return; 
  }
  var bookmark = {
    name: bookmarkName.value,
    url: bookmarkUrl.value,
  };
  bookmarkList.push(bookmark);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarkList)); // Save to local storage
  displayBookmark(bookmarkList);
  clear(); 
}

function displayBookmark(list) {
  var x = ``;
  for (var i = 0; i < list.length; i++) {
    x += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${list[i].name}</td>
      <td><a href="${
        list[i].url
      }"><button type="button" class="btn btn-visit"><i class="fa-solid fa-eye me-2"></i>Visit</button></td></a>
      <td><button type="button" onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
      <td><button type="button" onclick="getDataToUpdate(${i})" class="btn btn-warning"><i class="fa-solid fa-trash-can me-2"></i>Update</button></td>
    </tr>`;
  }

  document.getElementById("myData").innerHTML = x;
}

function clear() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}

function deleteProduct(i) {
  bookmarkList.splice(i, 1);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarkList));
  displayBookmark(bookmarkList);
}

function getDataToUpdate(i) {
  currentIndex = i;
  bookmarkName.value = bookmarkList[i].name;
  bookmarkUrl.value = bookmarkList[i].url;
  btnSubmit.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateBookmark() {
  if (
    !validateInput(bookmarkName.value, "name") ||
    !validateInput(bookmarkUrl.value, "url")
  ) {
    return;
  }
  bookmarkList[currentIndex].name = bookmarkName.value;
  bookmarkList[currentIndex].url = bookmarkUrl.value;
  displayBookmark(bookmarkList);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarkList)); // Save to local storage
  btnSubmit.classList.remove("d-none");
  btnUpdate.classList.add("d-none"); 
  clear();
}

function search(word) {
  var searchArr = [];
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].name.toLowerCase().includes(word.toLowerCase())) {
      searchArr.push(bookmarkList[i]);
    }
  }
  displayBookmark(searchArr);
}

function validateBookmark(element) {
  var regex = {
    name: /^[A-Za-z]{3,15}[0-9]{0,12}$/,
    url: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|org|net)\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
