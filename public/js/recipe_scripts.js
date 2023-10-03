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

let manage_input_file = function () {
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
};

document.addEventListener("DOMContentLoaded", function (event) {
  observer.disconnect();
  manage_input_file();
  observer.observe(preview, config);
});
const config = { childList: true, subtree: true };

const callback = function (mutationList, observer) {
  observer.disconnect();
  manage_input_file();
  observer.observe(preview, config);
};

const observer = new MutationObserver(callback);

observer.observe(preview, config);
