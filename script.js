// =========================================
// DADOS DO APLICATIVO
// =========================================

let grupos = JSON.parse(
    localStorage.getItem("treinoPlusGrupos")
) || [];

let grupoSelecionado = null;

let exercicioEditando = null;


// =========================================
// ELEMENTOS
// =========================================

const tituloTela =
    document.getElementById("tituloTela");

const contadorGrupos =
    document.getElementById("contadorGrupos");

const contadorExercicios =
    document.getElementById("contadorExercicios");

const gruposContainer =
    document.getElementById("gruposContainer");

const gruposInicio =
    document.getElementById("gruposInicio");

const listaGrupos =
    document.getElementById("listaGrupos");

const detalhesGrupo =
    document.getElementById("detalhesGrupo");

const nomeGrupo =
    document.getElementById("nomeGrupo");

const iconeGrupo =
    document.getElementById("iconeGrupo");

const exerciciosContainer =
    document.getElementById("exerciciosContainer");


// MODAL GRUPO

const modalGrupo =
    document.getElementById("modalGrupo");

const nomeGrupoInput =
    document.getElementById("nomeGrupoInput");


// MODAL EXERCÍCIO

const modalExercicio =
    document.getElementById("modalExercicio");

const tituloModalExercicio =
    document.getElementById(
        "tituloModalExercicio"
    );

const nomeExercicioInput =
    document.getElementById(
        "nomeExercicioInput"
    );

const cargaInput =
    document.getElementById(
        "cargaInput"
    );

const repeticoesInput =
    document.getElementById(
        "repeticoesInput"
    );


// =========================================
// SALVAR DADOS
// =========================================

function salvarDados() {

    localStorage.setItem(
        "treinoPlusGrupos",
        JSON.stringify(grupos)
    );

}


// =========================================
// ÍCONE DO GRUPO
// =========================================

function escolherIcone(nome) {

    const texto =
        nome.toLowerCase();


    if (
        texto.includes("perna") ||
        texto.includes("glute") ||
        texto.includes("glúte") ||
        texto.includes("panturrilha")
    ) {
        return "🦵";
    }


    if (
        texto.includes("peito") ||
        texto.includes("peitoral")
    ) {
        return "🫱";
    }


    if (
        texto.includes("costas")
    ) {
        return "🏋️";
    }


    if (
        texto.includes("ombro")
    ) {
        return "💪";
    }


    if (
        texto.includes("abd")
    ) {
        return "🔥";
    }


    if (
        texto.includes("bíceps") ||
        texto.includes("biceps")
    ) {
        return "💪";
    }


    if (
        texto.includes("tríceps") ||
        texto.includes("triceps")
    ) {
        return "💪";
    }


    return "💪";

}


// =========================================
// MOSTRAR TELA
// =========================================

function mostrarTela(nome, botao) {

    const telas =
        document.querySelectorAll(".tela");


    telas.forEach(function(tela) {

        tela.classList.add("escondida");

    });


    const telaEscolhida =
        document.getElementById(nome);


    if (!telaEscolhida) {

        return;

    }


    telaEscolhida.classList.remove(
        "escondida"
    );


    if (nome === "inicio") {

        tituloTela.textContent =
            "Início";

    }


    if (nome === "exercicios") {

        tituloTela.textContent =
            "Exercícios";

        voltarGrupos();

    }


    if (nome === "evolucao") {

        tituloTela.textContent =
            "Evolução";

    }


    if (nome === "configuracoes") {

        tituloTela.textContent =
            "Configurações";

    }


    if (botao) {

        document
            .querySelectorAll(".menu-item")
            .forEach(function(item) {

                item.classList.remove(
                    "active"
                );

            });


        botao.classList.add("active");

    }


    atualizarTela();

    fecharSidebar();

}


// =========================================
// SIDEBAR MOBILE
// =========================================

function abrirSidebar() {

    document
        .getElementById("sidebar")
        .classList.add("open");

}


function fecharSidebar() {

    document
        .getElementById("sidebar")
        .classList.remove("open");

}


// =========================================
// ATUALIZAR TELA
// =========================================

function atualizarTela() {

    atualizarContadores();

    mostrarGrupos();

    mostrarGruposInicio();

}


// =========================================
// CONTADORES
// =========================================

function atualizarContadores() {

    contadorGrupos.textContent =
        grupos.length;


    let total = 0;


    grupos.forEach(function(grupo) {

        if (grupo.exercicios) {

            total +=
                grupo.exercicios.length;

        }

    });


    contadorExercicios.textContent =
        total;

}


// =========================================
// MOSTRAR GRUPOS
// =========================================

function mostrarGrupos() {

    gruposContainer.innerHTML = "";


    if (grupos.length === 0) {

        gruposContainer.innerHTML = `

            <div class="vazio">

                Nenhum grupo cadastrado ainda.

                <br><br>

                Clique em
                <strong>+ Novo grupo</strong>
                para começar.

            </div>

        `;

        return;

    }


    grupos.forEach(function(grupo, index) {

        const card =
            document.createElement("div");


        card.className =
            "grupo-card";


        const quantidade =
            grupo.exercicios
                ? grupo.exercicios.length
                : 0;


        card.innerHTML = `

            <div class="grupo-top">

                <span class="grupo-icon">
                    ${grupo.icone}
                </span>

                <span class="grupo-arrow">
                    →
                </span>

            </div>


            <div class="grupo-name">
                ${grupo.nome}
            </div>


            <div class="grupo-count">

                ${quantidade}

                ${
                    quantidade === 1
                        ? " exercício"
                        : " exercícios"
                }

            </div>

        `;


        card.onclick = function() {

            abrirGrupo(index);

        };


        gruposContainer.appendChild(card);

    });

}


// =========================================
// GRUPOS NO INÍCIO
// =========================================

function mostrarGruposInicio() {

    gruposInicio.innerHTML = "";


    if (grupos.length === 0) {

        gruposInicio.innerHTML = `

            <div class="vazio">

                Você ainda não possui
                grupos cadastrados.

                <br><br>

                Vá em
                <strong>Exercícios</strong>
                para adicionar.

            </div>

        `;

        return;

    }


    grupos.forEach(function(grupo, index) {

        const card =
            document.createElement("div");


        card.className =
            "grupo-card";


        const quantidade =
            grupo.exercicios
                ? grupo.exercicios.length
                : 0;


        card.innerHTML = `

            <div class="grupo-top">

                <span class="grupo-icon">
                    ${grupo.icone}
                </span>

                <span class="grupo-arrow">
                    →
                </span>

            </div>


            <div class="grupo-name">
                ${grupo.nome}
            </div>


            <div class="grupo-count">

                ${quantidade}

                ${
                    quantidade === 1
                        ? " exercício"
                        : " exercícios"
                }

            </div>

        `;


        card.onclick = function() {

            mostrarTela("exercicios");

            abrirGrupo(index);

        };


        gruposInicio.appendChild(card);

    });

}


// =========================================
// ABRIR GRUPO
// =========================================

function abrirGrupo(index) {

    grupoSelecionado = index;


    const grupo =
        grupos[index];


    if (!grupo) {

        return;

    }


    listaGrupos.classList.add(
        "escondida"
    );


    detalhesGrupo.classList.remove(
        "escondida"
    );


    nomeGrupo.textContent =
        grupo.nome;


    iconeGrupo.textContent =
        grupo.icone;


    tituloTela.textContent =
        grupo.nome;


    mostrarExercicios();

    criarBotaoExcluirGrupo();

}


// =========================================
// BOTÃO EXCLUIR GRUPO
// =========================================

function criarBotaoExcluirGrupo() {

    if (!detalhesGrupo) {

        return;

    }


    // Remove botão antigo, caso exista
    const botaoAntigo =
        document.getElementById(
            "btnExcluirGrupo"
        );


    if (botaoAntigo) {

        botaoAntigo.remove();

    }


    const botao =
        document.createElement("button");


    botao.id =
        "btnExcluirGrupo";


    botao.type =
        "button";


    botao.innerHTML =
        "🗑️ Excluir grupo";


    botao.onclick =
        function(event) {

            event.stopPropagation();

            excluirGrupo();

        };


    // Tenta encontrar uma área de ações
    // já existente no detalhe do grupo

    const areaAcoes =
        detalhesGrupo.querySelector(
            ".acoes-grupo"
        );


    if (areaAcoes) {

        areaAcoes.appendChild(botao);

        return;

    }


    // Caso não exista uma área específica,
    // cria uma automaticamente

    const novaArea =
        document.createElement("div");


    novaArea.className =
        "acoes-grupo";


    novaArea.style.marginTop =
        "15px";


    novaArea.style.marginBottom =
        "15px";


    novaArea.appendChild(botao);


    detalhesGrupo.insertBefore(
        novaArea,
        exerciciosContainer
    );

}


// =========================================
// EXCLUIR GRUPO
// =========================================

function excluirGrupo() {

    if (grupoSelecionado === null) {

        return;

    }


    const grupo =
        grupos[grupoSelecionado];


    if (!grupo) {

        return;

    }


    const quantidadeExercicios =
        grupo.exercicios
            ? grupo.exercicios.length
            : 0;


    let mensagem =
        `Deseja excluir o grupo "${grupo.nome}"?`;


    if (quantidadeExercicios > 0) {

        mensagem +=
            `\n\nEste grupo possui ${quantidadeExercicios} ` +
            `${
                quantidadeExercicios === 1
                    ? "exercício"
                    : "exercícios"
            }.` +
            `\nTodos eles também serão excluídos.`;

    }


    const confirmou =
        confirm(mensagem);


    if (!confirmou) {

        return;

    }


    grupos.splice(
        grupoSelecionado,
        1
    );


    grupoSelecionado = null;


    salvarDados();

    atualizarTela();

    voltarGrupos();

}


// =========================================
// VOLTAR PARA GRUPOS
// =========================================

function voltarGrupos() {

    grupoSelecionado = null;


    listaGrupos.classList.remove(
        "escondida"
    );


    detalhesGrupo.classList.add(
        "escondida"
    );


    const botaoExcluir =
        document.getElementById(
            "btnExcluirGrupo"
        );


    if (botaoExcluir) {

        botaoExcluir.remove();

    }


    if (
        document.getElementById(
            "exercicios"
        ).classList.contains(
            "escondida"
        ) === false
    ) {

        tituloTela.textContent =
            "Exercícios";

    }

}


// =========================================
// MOSTRAR EXERCÍCIOS
// =========================================

function mostrarExercicios() {

    exerciciosContainer.innerHTML = "";


    if (grupoSelecionado === null) {

        return;

    }


    const grupo =
        grupos[grupoSelecionado];


    if (!grupo) {

        return;

    }


    if (!grupo.exercicios) {

        grupo.exercicios = [];

    }


    if (
        grupo.exercicios.length === 0
    ) {

        exerciciosContainer.innerHTML = `

            <div class="vazio">

                Nenhum exercício cadastrado
                neste grupo.

                <br><br>

                Clique em
                <strong>+ Novo exercício</strong>
                para adicionar.

            </div>

        `;

        return;

    }


    grupo.exercicios.forEach(
        function(exercicio, index) {

            const card =
                document.createElement("div");


            card.className =
                "exercicio-card";


            card.innerHTML = `

                <div class="exercicio-top">

                    <div class="exercicio-nome">
                        ${exercicio.nome}
                    </div>

                </div>


                <div class="exercicio-dados">

                    <div class="dado">

                        <span>
                            Carga atual
                        </span>

                        <strong>
                            ${exercicio.carga} kg
                        </strong>

                    </div>


                    <div class="dado">

                        <span>
                            Repetições
                        </span>

                        <strong>
                            ${exercicio.repeticoes}
                        </strong>

                    </div>

                </div>


                <div class="acoes">

                    <button
                        class="btn-edit"
                        onclick="editarExercicio(${index})"
                    >
                        ✏️ Editar
                    </button>


                    <button
                        class="btn-delete"
                        onclick="excluirExercicio(${index})"
                    >
                        🗑️ Excluir
                    </button>

                </div>

            `;


            exerciciosContainer.appendChild(card);

        }
    );

}


// =========================================
// ABRIR MODAL GRUPO
// =========================================

function abrirModalGrupo() {

    nomeGrupoInput.value = "";


    document
        .getElementById("modalGrupo")
        .classList.remove(
            "escondido"
        );


    setTimeout(function() {

        nomeGrupoInput.focus();

    }, 100);

}


// =========================================
// FECHAR MODAL GRUPO
// =========================================

function fecharModalGrupo() {

    document
        .getElementById("modalGrupo")
        .classList.add(
            "escondido"
        );

}


// =========================================
// SALVAR GRUPO
// =========================================

function salvarGrupo() {

    const nome =
        nomeGrupoInput.value.trim();


    if (nome === "") {

        alert(
            "Digite o nome do grupo."
        );

        return;

    }


    const grupoExiste =
        grupos.some(function(grupo) {

            return (
                grupo.nome.toLowerCase()
                ===
                nome.toLowerCase()
            );

        });


    if (grupoExiste) {

        alert(
            "Esse grupo já existe."
        );

        return;

    }


    grupos.push({

        nome: nome,

        icone: escolherIcone(nome),

        exercicios: []

    });


    salvarDados();

    atualizarTela();

    fecharModalGrupo();

}


// =========================================
// ABRIR MODAL EXERCÍCIO
// =========================================

function abrirModalExercicio() {

    if (grupoSelecionado === null) {

        alert(
            "Selecione um grupo primeiro."
        );

        return;

    }


    exercicioEditando = null;


    tituloModalExercicio.textContent =
        "Novo exercício";


    nomeExercicioInput.value = "";

    cargaInput.value = "";

    repeticoesInput.value = "";


    modalExercicio.classList.remove(
        "escondido"
    );


    setTimeout(function() {

        nomeExercicioInput.focus();

    }, 100);

}


// =========================================
// FECHAR MODAL EXERCÍCIO
// =========================================

function fecharModalExercicio() {

    modalExercicio.classList.add(
        "escondido"
    );


    exercicioEditando = null;

}


// =========================================
// SALVAR EXERCÍCIO
// =========================================

function salvarExercicio() {

    if (grupoSelecionado === null) {

        return;

    }


    const nome =
        nomeExercicioInput.value.trim();


    const carga =
        Number(cargaInput.value);


    const repeticoes =
        Number(repeticoesInput.value);


    if (nome === "") {

        alert(
            "Digite o nome do exercício."
        );

        return;

    }


    if (
        cargaInput.value === ""
        ||
        carga < 0
    ) {

        alert(
            "Digite uma carga válida."
        );

        return;

    }


    if (
        repeticoesInput.value === ""
        ||
        repeticoes < 0
    ) {

        alert(
            "Digite a quantidade de repetições."
        );

        return;

    }


    const grupo =
        grupos[grupoSelecionado];


    if (!grupo.exercicios) {

        grupo.exercicios = [];

    }


    if (
        exercicioEditando !== null
    ) {

        grupo.exercicios[
            exercicioEditando
        ] = {

            nome: nome,

            carga: carga,

            repeticoes: repeticoes

        };

    } else {

        grupo.exercicios.push({

            nome: nome,

            carga: carga,

            repeticoes: repeticoes

        });

    }


    salvarDados();

    atualizarContadores();

    mostrarGrupos();

    mostrarGruposInicio();

    mostrarExercicios();

    fecharModalExercicio();

}


// =========================================
// EDITAR EXERCÍCIO
// =========================================

function editarExercicio(index) {

    const grupo =
        grupos[grupoSelecionado];


    if (!grupo) {

        return;

    }


    const exercicio =
        grupo.exercicios[index];


    if (!exercicio) {

        return;

    }


    exercicioEditando = index;


    tituloModalExercicio.textContent =
        "Editar exercício";


    nomeExercicioInput.value =
        exercicio.nome;


    cargaInput.value =
        exercicio.carga;


    repeticoesInput.value =
        exercicio.repeticoes;


    modalExercicio.classList.remove(
        "escondido"
    );


    setTimeout(function() {

        nomeExercicioInput.focus();

    }, 100);

}


// =========================================
// EXCLUIR EXERCÍCIO
// =========================================

function excluirExercicio(index) {

    const grupo =
        grupos[grupoSelecionado];


    if (!grupo) {

        return;

    }


    const exercicio =
        grupo.exercicios[index];


    if (!exercicio) {

        return;

    }


    const confirmou =
        confirm(
            "Deseja excluir o exercício " +
            `"${exercicio.nome}"?`
        );


    if (!confirmou) {

        return;

    }


    grupo.exercicios.splice(
        index,
        1
    );


    salvarDados();

    atualizarTela();

    mostrarExercicios();

}


// =========================================
// ENTER NOS CAMPOS
// =========================================

nomeGrupoInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            salvarGrupo();

        }

    }
);


nomeExercicioInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            salvarExercicio();

        }

    }
);


cargaInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            salvarExercicio();

        }

    }
);


repeticoesInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            salvarExercicio();

        }

    }
);


// =========================================
// FECHAR MODAL CLICANDO FORA
// =========================================

modalGrupo.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modalGrupo
        ) {

            fecharModalGrupo();

        }

    }
);


modalExercicio.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modalExercicio
        ) {

            fecharModalExercicio();

        }

    }
);


// =========================================
// INICIALIZAÇÃO
// =========================================

grupos.forEach(function(grupo) {

    if (!grupo.exercicios) {

        grupo.exercicios = [];

    }


    if (!grupo.icone) {

        grupo.icone =
            escolherIcone(grupo.nome);

    }

});


// =========================================
// SERVICE WORKER / PWA
// =========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(function() {

                    console.log(
                        "Treino+ pronto para funcionar como PWA."
                    );

                })
                .catch(function(error) {

                    console.log(
                        "Erro ao registrar Service Worker:",
                        error
                    );

                });

        }
    );

}


salvarDados();

atualizarTela();
