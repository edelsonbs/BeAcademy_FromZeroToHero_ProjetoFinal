/* Modal */
const btnOpenModal = document.querySelector('.home-btn')
const btnCloseModal = document.querySelector('.modal-btn-close')
const btnModal = document.querySelector('#ifinalize')

/* Input CEP */
const getCep = document.querySelector('#icep')

/* Menu Mobile */
const btnMenuMobile = document.querySelector('#imenu')
const navMobile = document.querySelector('.menu-mobile')

/* Input Select */
const selectOption = document.querySelector('#iopcao')
const priceCourse = document.querySelector('#ivalor')

/* Colors */
const success = '#20c997';
const danger = '#dc3545';

//document.body.addEventListener('load', hiddeMsg)

/* Create Menu Mobile */
const menuMobile = `
    <ul>
        <li><a href="#home">Início</a></li>
        <li><a href="#courses">Cursos</a></li>
        <li><a href="#about">Quem Somos</a></li>
        <li><a href="#contact">Contato</a></li>
    </ul>
`
navMobile.innerHTML = menuMobile

btnMenuMobile.addEventListener('click', () => {
    if (navMobile.style.display == 'none') {
        navMobile.style.display = 'block'
        btnMenuMobile.innerHTML = 'close'
    } else {
        navMobile.style.display = 'none'
        btnMenuMobile.innerHTML = 'menu'
    }
})

/* Checking if the screen has been scrolled */
window.addEventListener("scroll", changeBackgroundNav);
window.addEventListener("scroll", hiddeMenu);

function changeBackgroundNav() {
    if (window.scrollY > 0) {
        document.querySelector('.menu').style.background = "rgba(21, 1, 39,0.9)"
    } else {
        document.querySelector('.menu').style.background = "none"
    }
}

/* Checking if the screen has been scrolled in smartphone */
if (window.screen.width < 768) {
    window.addEventListener('scroll', hiddeMenu);
}

/* Hidde principal menu and show menu mobile */
function hiddeMenu() {
    navMobile.style.display = 'none'
    btnMenuMobile.innerHTML = 'menu'
}

/* Open modal */
btnOpenModal.addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'block'
    document.querySelector('.modal').style.top = '0'
})

/* Close modal */
btnCloseModal.addEventListener('click', closeModal)

function closeModal() {
    document.querySelector('.bg-modal').style.display = 'none'
    document.querySelector('.modal').style.top = '-100%'
    resetModalForm()
}

/* Set valeu input price */
selectOption.addEventListener('change', () => {
    const showPrice = selectOption.options[selectOption.selectedIndex].value
    priceCourse.value = `${showPrice}`
    console.log(showPrice)
})

// const name = document.querySelector('#iname')
// const email = document.querySelector('#iemail')
// const tel = document.querySelector('#itel')

// /* Checking if the submit button has been clicked */
// btnModal.addEventListener('click', () => {
//     let form = document.querySelector('#iform')

//     if (name.value !== '' && email.value !== '' && itel.value !== '' && form.submit()) {
//         showMsg('Matrícula realizada com sucesso!')        
//     }

//     document.querySelector('.msg').style.background = `${success}`
//     setTimeout(() => {//         
//         hiddeMsg()
//     }, 3000)

// })

/* Reset modal form */
function resetModalForm() {
    document.querySelector('#iform').reset()
    getCep.style.border = '1px solid #afa3d6'
}

/* Show message */
function showMsg(msg) {
    document.querySelector('.msg').style.display = 'block'
    document.querySelector('.msg').style.top = '0'
    document.querySelector('.msg').innerHTML = `${msg}`
    setTimeout(() => {
        hiddeMsg()
    }, 3000)
}

/* Hidde message */
function hiddeMsg() {
    document.querySelector('.msg').style.display = 'none'
    document.querySelector('.msg').style.top = '-100%'
}

/* Capture the value of the cep input*/
getCep.addEventListener('change', () => {
    let value = getCep.value
    getAdrress(value)
})

/* Limit the value of the cep input */
getCep.addEventListener('input', () => {
    if (getCep.value.length > getCep.maxLength) {
        getCep.value = getCep.value.slice(0, getCep.maxLength)
    }    
})

/* Promisse - Async/Await */
async function getAdrress(cep) {

    try {
        let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let data = await response.json()

        const logradouro = document.querySelector('#ilogradouro')
        const complemento = document.querySelector('#icomplemento')
        const bairro = document.querySelector('#ibairro')
        const cidade = document.querySelector('#icidade')
        const uf = document.querySelector('#iuf')

        //console.log(data)       

        if (data.erro !== true) {
            btnModal.disabled = false

            getCep.style.border = `1px solid ${success}`
            logradouro.value = data.logradouro
            complemento.value = data.complemento
            bairro.value = data.bairro
            cidade.value = data.localidade
            uf.value = data.uf
        } else {
            showMsg('CEP inválido!')
            document.querySelector('.msg').style.background = `${danger}`
            getCep.style.border = `1px solid ${danger}`
            getCep.focus()
        }

    } catch (error) {
        //throw new Error('Erro na requisição')        
        showMsg('CEP inválido!')
        document.querySelector('.msg').style.background = `${danger}`
        getCep.style.border = `1px solid ${danger}`
        getCep.focus()
    }
}
