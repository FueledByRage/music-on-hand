let video;
let handPose;
let hands = [];

let sound;
let isMusicPlaying = false;
let uploadScreen = true;
let handposeModel = false;
let uploadButton;
let playButton;

function preload() {
  handPose = ml5.handPose({ flipped: false }, () =>{
    console.log('Modelo Handpose carregado!');
    handposeModel = true;
  });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);

  textAlign(CENTER);
  textSize(18);
  
  uploadButton = document.getElementById("file-input");
  uploadButton.addEventListener('change', handleFileUpload);
  
  playButton = document.getElementById("play-button");
  playButton.onclick = bootStrap;
}

function handleFileUpload(event) {
  const file = event.target.files[0];

  const acceptedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'];

  if (acceptedTypes.includes(file.type)) {
    if (sound) {
      sound.stop();
    }
    sound = loadSound(file, () => {
      console.log('Som carregado com sucesso!');

      uploadButton.style.display = 'none';
      playButton.style.display = 'block';
    });
  } else {
    alert('Por favor, selecione um arquivo de áudio MP3');
  }
}

function bootStrap() {
  if (sound && !isMusicPlaying) {
    sound.play();
    isMusicPlaying = true;
  }
  
  playButton.style.display = 'none';
  
  uploadScreen = false;
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  handPose.detectStart(video, gotHands);
}

function draw() {
  if(uploadScreen) {
    background(20, 20, 50);
    fill(255);
    noStroke();
    text('Selecione um arquivo de música MP3', width/2, height/2 - 50);
    
    if (sound && !playButton.style.display === 'none') {
      text('Arquivo carregado! Clique para iniciar.', width/2, height/2 + 100);
    }
  } else {
  image(video, 0, 0);

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        const indexFinger = hand.index_finger_tip;
        const thumb = hand.thumb_tip;
        
        const distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

        let modify = map(distance, 20, 200, 0, 1);
        modify = constrain(modify, 0, 1);
        
        if(hand.handedness === 'Left') {
            
          if (sound && isMusicPlaying) {
              sound.setVolume(modify);
          }

          drawHandLines({
            r: 255,
            g: 0,
            b: 0
          }, indexFinger, thumb, distance);
        }else{
          if (sound && isMusicPlaying) {
              sound.rate(modify);
          }
          drawHandLines({
            r: 0,
            g: 0,
            b: 255
          }, indexFinger, thumb, distance);
        }
        
        pop();
      }
    }}
  }
}

function drawHandLines(color, indexFinger, thumb, distance) {
  const maxDistance = 200;
  const maxLines = 5;
  
  let numLines = Math.ceil((distance / maxDistance) * maxLines);
  numLines = constrain(numLines, 1, maxLines);
  
  const midX = (indexFinger.x + thumb.x) / 2;
  const midY = (indexFinger.y + thumb.y) / 2;
  
  const angle = atan2(indexFinger.y - thumb.y, indexFinger.x - thumb.x);
  
  const lineWidth = distance * 0.6;
  
  const maxHeight = distance * 0.5;
  
  const spacing = 15;
  
  push();
  translate(midX, midY);
  rotate(angle);
  
  strokeWeight(6);
  stroke(color.r, color.g, color.b);
  noFill();
  
  
  for (let i = 0; i < numLines; i++) {
    const lineHeight = map(i, 0, maxLines - 1, maxHeight, maxHeight / 3);
    
    const lineX = -lineWidth / 2 + i * spacing - (numLines - 1) * spacing / 2;
    
    line(lineX, -lineHeight / 2, lineX, lineHeight / 2);
  }
}