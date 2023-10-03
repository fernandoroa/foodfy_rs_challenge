// equivalent to window.location
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

const formDelete = document.querySelector("#form-delete");

if (formDelete) {
  formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Deseja Deletar?");
    if (!confirmation) {
      event.preventDefault();
    }
  });
}

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (
      firstAndLastPage ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }
      pages.push(currentPage);
      oldPage = currentPage;
    }
  }
  return pages;
}

function addStatus(recipe_cards) {
  const status = recipe_cards.dataset.status;
  if (status == "no_filter") {
    const span = document.createElement("span");
    span.textContent = "Nada encontrado, mostrando tudo";
    recipe_cards.insertAdjacentElement("beforebegin", span);
  }
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page_in_use = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page_in_use, total);
  let elements = "";
  let new_element = "";
  for (let page of pages) {
    if (String(page).includes("...")) {
      new_element = `<span>${page}</span>`;
    } else {
      if (filter) {
        new_element = `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        new_element = `<a href="?page=${page}">${page}</a>`;
      }
      if (page == page_in_use) {
        new_element = new_element.replace("href", "class='page_in_use' href");
      }
    }
    elements += new_element;
  }
  pagination.innerHTML = elements;
}

const recipe_cards = document.querySelector(".recipe_cards");
const pagination = document.querySelector(".pagination");

if (pagination) {
  createPagination(pagination);
}

if (recipe_cards) {
  addStatus(recipe_cards);
}

let preview = document.querySelector("#photos-preview-and-upload");
let form_button = document.querySelector("button[form='form-put']");
if (!form_button) {
  form_button = document.querySelector("button[form='form-create']");
}
let button_tooltip = document.querySelector(".tooltip_text");
let photos_input = document.querySelector("#photos-input");
let photos_upload_i = document.querySelector("#photos-upload i");
const uploadLimit = 5;
const child_not_photos = 2;
const child_photo_limit = uploadLimit + child_not_photos;
document.querySelector("input[type=file]").setAttribute("title", "");

let manage_input_file = function() {
  if (preview.childElementCount <= child_not_photos) {
    form_button.setAttribute("disabled", "");
    button_tooltip.classList.add("active");
  } else {
    form_button.removeAttribute("disabled");
    button_tooltip.classList.remove("active");
  }
  if (preview.childElementCount >= child_photo_limit) {
    photos_upload_i.innerHTML = "block";
    photos_input.style.cursor = "not-allowed";
  } else {
    photos_upload_i.innerHTML = "add";
    photos_input.style.cursor = "pointer";
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  observer.disconnect();
  manage_input_file()
  observer.observe(preview, config);
});
const config = { childList: true, subtree: true };

const callback = function (mutationList, observer) {
  observer.disconnect();
  manage_input_file()
  observer.observe(preview, config);
};

const observer = new MutationObserver(callback);

observer.observe(preview, config);

const PhotosUpload = {
  input: "",
  preview: document.querySelector("#photos-preview-and-upload"),
  uploadLimit: 5,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;
    if (PhotosUpload.hasLimit(event)) return;
    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file);
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const div = PhotosUpload.getContainer(image);
        PhotosUpload.preview.appendChild(div);
      };
      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;
    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;
    if (totalPhotos > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return true;
    }

    return false;
  },
  getAllFiles() {
    const dataTransfer = new DataTransfer();
    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  },
  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");
    div.onclick = PhotosUpload.removePhoto;
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());
    return div;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode; // parent of i X
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    photoDiv.remove();
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;
    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }
    photoDiv.remove();
  },
};
