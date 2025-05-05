export class View {
  video;
  input;
  uploadButton;
  playButton;

  constructor(
    input = null,
    uploadButton = null,
    playButton = null
  ){
    this.input = input;
    this.uploadButton = uploadButton;
    this.playButton = playButton;
  }

  static setUp(){
    createCanvas(640, 480);

    textAlign(CENTER);
    textSize(18);

    const input = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload");
    const playButton = document.getElementById("play-button");

    return new View(input, uploadButton, playButton);
  }

  onUpload(handleUpload){
    if(!input){
      throw new Error('Input element not set');
    }

    input.addEventListener('change', handleUpload);

    return this;
  }

  onPlaying(handlePlaying){
    if(!playButton){
      throw new Error('Play button not set');
    }

    playButton.onclick = handlePlaying;

    return this;
  }

  toPlaying(){
    if(!playButton){
      throw new Error('Play button not set');
    }

    playButton.style.display = 'none';
  }

  toFileUploaded(){
    if(!uploadButton){
      throw new Error('Upload button not set');
    }

    uploadButton.style.display = 'none';
    playButton.style.display = 'block';
  }

  toMusicPlaying(){
    if(!playButton){
      throw new Error('Play button not set');
    }

    playButton.style.display = 'none';
  }

  startVideo(videoProps){
    video = createCapture(VIDEO);
    video.size(videoProps.width, videoProps.height);
    video.hide();

    return video;
  }
}