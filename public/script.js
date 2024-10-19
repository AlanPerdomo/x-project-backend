

async function cadastrar(data){
    return await axios({
        url: `${apiUrl}/user/login`,
        method: 'post',
        data: data,
        timeout: 5000,
        headers:{Accept: 'application/json'}
    }).then((response) => {
        return Promise.resolve(response.data);
    })
    .catch((error) => {
        return Promise.reject(error);
    });
}

function toggleForms() {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const toggleText = document.getElementById('toggle-form');

    if (loginSection.style.display === 'none') {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
        toggleText.innerHTML = 'Primeira vez aqui? <a href="#" onclick="toggleForms()">Cadastre-se</a>';
    } else {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        toggleText.innerHTML = 'Já tem uma conta? <a href="#" onclick="toggleForms()">Faça login</a>';
    }
}

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('login-password').value;

    let data = {
        email: email,
        password: password
    }
    alert(data);
    token = await cadastrar(data);   
    console.log(token)
});

// document.getElementById('register-form').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;

//     // Enviar dados para o backend
//     const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         alert('Cadastro realizado com sucesso!');
//         // Alternar para o formulário de login
//         toggleForms();
//     } else {
//         alert(data.message || 'Erro ao realizar cadastro.');
//     }
// });

