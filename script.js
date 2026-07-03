const perguntas = [
  {
    pergunta: "Qual é a forma correta?",
    opcoes: ["Agente chegou cedo.", "A gente chegou cedo."],
    resposta: 1
  },
  {
    pergunta: "Complete a frase: Eu ____ estudar português.",
    opcoes: ["gosto de", "gosto em"],
    resposta: 0
  },
  {
    pergunta: "Qual palavra está escrita corretamente?",
    opcoes: ["Excessão", "Exceção"],
    resposta: 1
  },
  {
    pergunta: "Qual é o plural de 'cidadão'?",
    opcoes: ["Cidadões", "Cidadãos"],
    resposta: 1
  },
  {
    pergunta: "Qual frase está correta?",
    opcoes: ["Faz dois anos que estudo.", "Fazem dois anos que estudo."],
    resposta: 0
  }
];

let indice = 0;
let pontos = Number(localStorage.getItem("pontos")) || 0;

const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const score = document.getElementById("score");
const barra = document.getElementById("barra");
const proxima = document.getElementById("proxima");

function atualizarPlacar() {
  score.textContent = `${pontos} pontos`;
  barra.value = Math.min(pontos, 100);
}

function carregarPergunta() {
  proxima.style.display = "none";
  alternativas.innerHTML = "";

  if (indice >= perguntas.length) {
    pergunta.innerHTML = "🎉 Parabéns! Você concluiu os exercícios.";
    alternativas.innerHTML = `
      <p><strong>Pontuação final:</strong> ${pontos} pontos.</p>
      <button onclick="reiniciar()">Refazer Exercícios</button>
    `;
    return;
  }

  const atual = perguntas[indice];
  pergunta.textContent = atual.pergunta;

  atual.opcoes.forEach((texto, i) => {
    const botao = document.createElement("button");
    botao.textContent = texto;

    botao.onclick = () => {
      const botoes = alternativas.querySelectorAll("button");
      botoes.forEach(b => b.disabled = true);

      if (i === atual.resposta) {
        botao.classList.add("correta");
        pontos += 10;
        localStorage.setItem("pontos", pontos);
        atualizarPlacar();
      } else {
        botao.classList.add("errada");
        botoes[atual.resposta].classList.add("correta");
      }

      proxima.style.display = "block";
    };

    alternativas.appendChild(botao);
  });
}

proxima.onclick = () => {
  indice++;
  carregarPergunta();
};

function reiniciar() {
  indice = 0;
  pontos = 0;
  localStorage.setItem("pontos", 0);
  atualizarPlacar();
  carregarPergunta();
}

atualizarPlacar();
carregarPergunta();
