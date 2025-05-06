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
    uploadButton.style.display = 'flex';

    return new View(input, uploadButton, playButton);
  }

  onUpload(handleUpload){
    if(!this.input){
      throw new Error('Input element not set');
    }

    this.input.addEventListener('change', handleUpload);

    return this;
  }

  onPlaying(handlePlaying){
    if(!this.playButton){
      throw new Error('Play button not set');
    }

    this.playButton.onclick = handlePlaying;

    return this;
  }

  toPlaying(){
    if(!this.playButton){
      throw new Error('Play button not set');
    }

    this.playButton.style.display = 'none';
  }

  toFileUploaded(){
    if(!this.uploadButton){
      throw new Error('Upload button not set');
    }

    this.uploadButton.style.display = 'none';
    this.playButton.style.display = 'block';
  }

  toMusicPlaying(){
    if(!this.playButton){
      throw new Error('Play button not set');
    }

    this.playButton.style.display = 'none';
  }

  startVideo(videoProps){
    this.video = createCapture(VIDEO);
    this.video.size(videoProps.width, videoProps.height);
    this.video.hide();

    return this.video;
  }
}