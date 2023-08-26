const products = [
    { id: 0, title: 'Iphone 5', year: '2013', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 0 },
    { id: 1, title: 'Iphone 6', year: '2014', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 0 },
    { id: 2, title: 'Iphone 7', year: '2015', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 0 },
    { id: 3, title: 'Asus Aspire', year: '2019', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 1 },
    { id: 4, title: 'Mac book Air', year: '2021', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 1 },
    { id: 5, title: 'Lenvo A11809', year: '2018', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 1 },
    { id: 6, title: 'Indesit X32422', year: '2022', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 2 },
    { id: 7, title: 'Samsung RB36T677', year: '2022', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 2 },
    { id: 8, title: 'Bosh ice', year: '2022', info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quam sunt amet illum optio voluptatum quoad porro ex ipsam adipisci atque voluptas quidem, sequi,rem odit corporis? Ipsa.", categoryId: 2 },
]

const categories = [
    { id: 0, title: "Телефоны" },
    { id: 1, title: "Компютеры" },
    { id: 2, title: "Холодильники" },
]

let currentProduct = null


const nav = document.querySelector('.nav')
const productList = document.querySelector('.products')
const info = document.querySelector('.info')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal #close')
const modalForm = document.querySelector('.modal form')
const modalInfoContainer = document.querySelector('.modal .info_container')
const modalContentContainer = document.querySelector('.modal .content_container')

categories.forEach((e) => {
    const span = document.createElement('span')
    span.setAttribute('data-category', e.id)
    span.innerText = e.title
    nav.append(span)
})

nav.addEventListener('click', (e) => {
    if (e.target.tagName === "SPAN") {
        const categoryId = Number(e.target.dataset.category)
        const searchedProducts = products.filter(e => e.categoryId === categoryId)
        productList.innerHTML = searchedProducts.reduce((acc, cur) => {
            return acc = acc.concat(
                `
                    <div data-id="${cur.id}" class="product_card">
                        <h2>${cur.title}</h2>
                        <p><strong>Year: </strong>${cur.year}</p>
                        <button>info</button>
                    </div>
                `
            )
        }, '')
        e.target.parentNode.querySelector('span.active') ? e.target.parentNode.querySelector('span.active').classList.remove('active') : null
        e.target.classList.add('active')
        info.innerHTML = ''
    }

})

productList.addEventListener('click', (e) => {
    if (e.target.tagName === "H2" || e.target.tagName === "BUTTON") {
        const currentProductId = Number(e.target.parentNode.dataset.id)
        currentProduct = products.find(e => e.id === currentProductId)
        info.innerHTML = `
            <h1>${currentProduct.title}</h1>
                <p>
                   <strong>Year</strong> ${currentProduct.year}
                </p>
                <p>
                    ${currentProduct.info}
                </p>
            <button data-id="${currentProductId}">Купить</button>
        `
    }
})

info.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const { title, year, info } = currentProduct
        modal.style.display = "flex"
        modalContentContainer.style.display = "flex"
        document.querySelector('.modal .product_card').innerHTML = `
        <h2>${title}</h2>
            <p><strong>Year: </strong>${year}</p>
        <p>${info}</p>
    `
        
    }
})

function isValidForm({name, city, count, shiping}) {
    const isName = name.trim() && name.length < 30 && name.length > 5 ? false : 'Тут есть ошибка'
    const isCity = city ? false : 'Это поле обязательно'
    const isCount = Number(count) > 0 && Number(count) <= 5 ? false : 'Тут есть ошибка'
    const isShiping = shiping.trim() && shiping.length < 40 ? false : 'Тут есть ошибка'
    if (!isCity && !isCount && !isShiping && !isName) {
        return { status: true }
    } else {
        return { status: false, isCity, isCount, isShiping, isName }
    }
}

modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = [...(new FormData(e.currentTarget))]
    const data = Object.fromEntries(fd)
    const {name, city, shiping, pay, count, comment} = data
    if (isValidForm(data).status) {
        document.querySelectorAll('.modal form span.err').forEach((e) => {
            e.innerText = ''
        })

        modalForm.reset()

        modalContentContainer.style.display = 'none'
        modalInfoContainer.style.display = "flex"

        modalInfoContainer.innerHTML = `
            <span><strong>Your name: </strong>${name}</span>
            <span><strong>Your city: </strong>${city}</span>
            <span><strong>Your shiping address: </strong>${shiping}</span>
            <span><strong>Your pay method: </strong>${pay}</span>
            <span><strong>Your going to by ${count}: </strong>${currentProduct.title}</span>
            <span><strong>Comment: </strong>${comment}</span>
        `
    } else {
        const { isName, isCity, isCount, isShiping } = isValidForm(data)
        if (isName) {
            document.querySelector('.modal form *[name="name"]').nextElementSibling.innerText = isName
        }

        if (isCity) {
            document.querySelector('.modal form *[name="city"]').nextElementSibling.innerText = isCity
        }

        if (isCount) {
            document.querySelector('.modal form *[name="count"]').nextElementSibling.innerText = isCount
        }

        if (isShiping) {
            document.querySelector('.modal form *[name="shiping"]').nextElementSibling.innerText = isShiping
        }
    }
})


modalClose.addEventListener('click', () => {
    modalInfoContainer.style.display = "none"
    modal.style.display = "none"
})