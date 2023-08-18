const dishes = [
  {
    id: "tbb",
    filename: "burger.png",
    dishname: "Triplo bacon burger",
    author: "Jorge Relato",
    favorite: true,
  },
  {
    id: "p4e",
    filename: "pizza.png",
    dishname: "Pizza 4 estações",
    author: "Fabiana Melo",
    favorite: true,
  },
  {
    id: "eaa",
    filename: "espaguete.png",
    dishname: "Espaguete ao alho",
    author: "Júlia Kinoto",
    favorite: true,
  },
  {
    id: "lmc",
    filename: "lasanha.png",
    dishname: "Lasanha mac n’ cheese",
    author: "Juliano Vieira",
    favorite: true,
  },
  {
    id: "dpc",
    filename: "doce.png",
    dishname: "Docinhos pão-do-céu",
    author: "Ricardo Golvea",
    favorite: true,
  },
  {
    id: "afb",
    filename: "asinhas.png",
    dishname: "Asinhas de frango ao barbecue",
    author: "Vania Steroski",
    favorite: true,
  },
  {
    id: "tbb",
    filename: "burger.png",
    dishname: "Triplo bacon burger",
    author: "Jorge Relato",
    favorite: false,
  },
  {
    id: "p4e",
    filename: "pizza.png",
    dishname: "Pizza 4 estações",
    author: "Fabiana Melo",
    favorite: false,
  },
  {
    id: "eaa",
    filename: "espaguete.png",
    dishname: "Espaguete ao alho",
    author: "Júlia Kinoto"
  },
  {
    id: "lmc",
    filename: "lasanha.png",
    dishname: "Lasanha mac n’ cheese",
    author: "Juliano Vieira"
  },
  {
    id: "dpc",
    filename: "doce.png",
    dishname: "Docinhos pão-do-céu",
    author: "Ricardo Golvea"
  },
  {
    id: "afb",
    filename: "asinhas.png",
    dishname: "Asinhas de frango ao barbecue",
    author: "Vania Steroski"
  },
]

const modalOverlay = document.querySelector('.modal-overlay')

/* gets collection*/

document.querySelector(".close-modal").addEventListener("click", function() {
  modalOverlay.classList.remove("active")
  modalOverlay.querySelector("img").src = ""
})

const initial_cards = document.querySelector('.cards')

/* favorites only */

if (initial_cards) {
  initial_cards.innerHTML = dishes.map(item => {
  if (item.favorite) {
  return `
    <div class="card" id="${item.id}">
      <div class="card__image-container">
        <img src="foodassets/${item.filename}" alt="${item.dishname}">
      </div>
      <div class="card__content">
        <p>${item.dishname}</p>
      </div>
      <div class="card__info">
        <p>${item.author}</p>
      </div>
    </div>
  `
    }
  }).join("")
}


const cards = document.querySelectorAll('.card')
for (let card_ready of cards) {
  card_ready.addEventListener("click", function() {
    const filename = card_ready.querySelector("img").getAttribute("src")
    const dishname = card_ready.querySelector(".card__content").querySelector("p").innerHTML
    const author   = card_ready.querySelector(".card__info").querySelector("p").innerHTML

    modalOverlay.classList.add('active')
    modalOverlay.querySelector("img").src = filename
    modalOverlay.querySelector("h1").innerText = dishname
    modalOverlay.querySelector("span").innerText = `por ${author}`
  })
}
