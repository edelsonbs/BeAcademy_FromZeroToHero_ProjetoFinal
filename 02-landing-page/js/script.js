/* Modal */
const alert = document.querySelector('.msg');
const btnOpenModal = document.querySelector('.home-btn');
const btnCloseModal = document.querySelector('.modal-btn-close');

const inputTel = document.querySelector('#itel');
const inputCep = document.querySelector('#icep');
const selectOption = document.querySelector('#iopcao');
const priceCourse = document.querySelector('#ivalor');
const btnSendFormModal = document.querySelector('#ifinalize');

/* Menu Mobile */
const btnMenuMobile = document.querySelector('#imenu');
const navMobile = document.querySelector('.menu-mobile');

/* Colors */
const success = '#20c997';
const danger = '#dc3545';

let cepValue;

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
navMobile.innerHTML = menuMobile;

btnMenuMobile.addEventListener('click', () => {
    if (navMobile.style.display == 'none') {
        navMobile.style.display = 'block';
        btnMenuMobile.innerHTML = 'close';
    } else {
        navMobile.style.display = 'none';
        btnMenuMobile.innerHTML = 'menu';
    }
})

/* Checking if the screen has been scrolled */
window.addEventListener("scroll", changeBackgroundNav);
window.addEventListener("scroll", hiddeMenu);

function changeBackgroundNav() {
    if (window.scrollY > 0) {
        document.querySelector('.menu').style.background = "rgba(21, 1, 39,0.9)";
    } else {
        document.querySelector('.menu').style.background = "none";
    }
}

/* Checking if the screen has been scrolled in smartphone */
if (window.screen.width < 768) {
    window.addEventListener('scroll', hiddeMenu);
}

/* Hidde principal menu and show menu mobile */
function hiddeMenu() {
    navMobile.style.display = 'none';
    btnMenuMobile.innerHTML = 'menu';
}

/* Open modal */
btnOpenModal.addEventListener('click', openModal);

/* Close modal */
btnCloseModal.addEventListener('click', () => {
    closeModal();
    resetModalForm();
});

/* Open modal function */
function openModal() {
    document.querySelector('.bg-modal').style.display = 'block';
    document.querySelector('.modal').style.top = '0';
}

/* Close modal function */
function closeModal() {
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.modal').style.top = '-100%';
}

/* Set value input price */
selectOption.addEventListener('change', () => {
    const showPrice = selectOption.options[selectOption.selectedIndex].value;
    priceCourse.value = `${showPrice}`;   
})

/* Reset modal form */
function resetModalForm() {
    document.querySelector('#iform').reset();
    inputCep.style.border = '1px solid #afa3d6';
}

/* Show message */
function showMsg(msg) {
    alert.style.display = 'block';
    alert.style.top = '0';
    alert.innerHTML = `${msg}`;

    setTimeout(() => {
        hiddeMsg();
    }, 3000);
}

/* Hidde message */
function hiddeMsg() {
    alert.style.display = 'none';
    alert.style.top = '-100%';
}

/* Styling message */
function stylingMessage(style) {
    alert.style.background = style; 
}

/* Capture the event of the telephone input */
inputTel.addEventListener('input', maskTel);

/* Capture the event of the cep input */
inputCep.addEventListener('input', maskCEP);

/* Capture the event (change) of the cep input */
inputCep.addEventListener('change', () => {
    cepValue = inputCep.value.replace("-", "");

    searchCEP(cepValue);
})

/* Capture the event (focusout) of the cep input and call getAddress function */
inputCep.addEventListener('focusout', getAddress);

/* Capture the event (submit) of the form */
document.querySelector('#iform').addEventListener('submit', function(e){
    e.preventDefault();
    showMsgSucess();
    closeModal();
    resetModalForm();
});

/* Mask CEP function */
function maskCEP() {
    inputCep.value = inputCep.value.replace(/\D/g, "");
    inputCep.value = inputCep.value.replace(/^(\d{5})(\d{3})(\d+)/, "$1-$2");
    inputCep.value = inputCep.value.replace(/^(\d{5})(\d)/, "$1-$2");
}

/* Mask Telephone function */
function maskTel() {
    inputTel.value = inputTel.value.replace(/\D/g, "");
    inputTel.value = inputTel.value.replace(
        /^(\d{2})(\d{5})(\d{4})(\d+)/,
        "($1) $2-$3"
    );
    inputTel.value = inputTel.value.replace(
        /^(\d{2})(\d{5})(\d)/,
        "($1) $2-$3"
    );
    inputTel.value = inputTel.value.replace(/^(\d{2})(\d)/, "($1) $2");
    inputTel.value = inputTel.value.replace(/^(\d)/, "($1");
}

/* Promise - Async/Await */
async function searchCEP(cep) {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let data = await response.json();

    return data;
}

/* Filling address information */
async function getAddress() {
    const data = await searchCEP(cepValue);

    const logradouro = document.querySelector('#ilogradouro');
    const complemento = document.querySelector('#icomplemento');
    const bairro = document.querySelector('#ibairro');
    const cidade = document.querySelector('#icidade');
    const uf = document.querySelector('#iuf');

    try {
        if (!data.erro == true) {           
            inputCep.style.border = `1px solid ${success}`;

            logradouro.value = data.logradouro;
            complemento.value = complemento.value;
            bairro.value = data.bairro;
            cidade.value = data.localidade;
            uf.value = data.uf;
        } else {
            showCepErro();
        }

    } catch (error) {        
        showMsg('Erro ao buscar o CEP');
    }
}

function showCepErro() {    
    stylingMessage(danger);
    showMsg('CEP inválido');
    inputCep.style.border = `1px solid ${danger}`;    
    inputCep.focus();
}

function showMsgSucess() {   
    stylingMessage(success);
    showMsg('Cadastro realizado com sucesso');
}
