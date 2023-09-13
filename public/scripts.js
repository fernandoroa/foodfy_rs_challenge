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
    span.textContent = "Nada encontrado, mostrando tudo"
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
  addStatus(recipe_cards)
}
