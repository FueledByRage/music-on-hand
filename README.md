# 🎵 Hand Music Controller

Um projeto interativo em JavaScript que utiliza **visão computacional** para controlar a reprodução de músicas com gestos das mãos!


<video src="./assets/play.mp4" width="320" height="240" controls></video>

## ✋ O que é?

Este app permite que você **envie uma música** e, usando a **webcam** do seu dispositivo, **controle o volume e a velocidade da reprodução com os movimentos das mãos**:

- **Mão Esquerda**: controla o **volume**, com base na abertura entre o dedo indicador e o polegar.
- **Mão Direita**: controla a **velocidade da música** (rate), também com base na distância entre os dedos.
- Feedback visual é desenhado nas mãos detectadas, ilustrando os controles ativos.

## 🧠 Tecnologias Utilizadas

- [p5.js](https://p5js.org/) — Biblioteca criativa para manipulação gráfica e som.
- [ml5.js](https://ml5js.org/) — Biblioteca de machine learning friendly para a web.
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) — Extensão para lidar com sons em p5.js.
- HTML5, CSS3 e JavaScript com módulos ES6.

## 🖥️ Como usar

1. Clone este repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` em seu navegador (preferencialmente em um ambiente com **HTTPS** ou `localhost`, por causa do uso da webcam).
3. Clique em **"Enviar Música"** e selecione um arquivo de áudio (`.mp3`, `.wav`, `.ogg`, etc).
4. Após o carregamento, clique em **"Tocar Música 🎵"**.
5. Permita o uso da **webcam** quando solicitado.
6. Movimente suas mãos em frente à câmera para controlar:
   - Volume (com a mão **esquerda**)
   - Velocidade (com a mão **direita**)

