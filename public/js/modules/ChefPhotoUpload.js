const ChefPhotoUpload = {
  input: "",
  preview: document.querySelector("#chef-photo-preview"),
  file: [],
  handleSingleFileInput(event) {
    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = String(reader.result);
      const div = ChefPhotoUpload.getContainer(image);
      ChefPhotoUpload.preview.innerHTML = "";
      ChefPhotoUpload.preview.appendChild(div);
    };
    reader.readAsDataURL(file);

  },
  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");
    div.appendChild(image);
    return div;
  },
};

export { ChefPhotoUpload };
