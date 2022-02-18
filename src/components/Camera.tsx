import { useEffect, useRef } from "react"
import './camera.css';

export const Camera = () => {

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: {
      width: { min: 1280 },
      height: { min: 720 }
    }}).then((stream: any) => {
      let video: any = videoRef.current;
      video.srcObject = stream;
      video.play();
    }).catch(err => console.error);
  }

  const takePhoto = () => {
    const width = 314;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo: any = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx: any = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

  }

  const downloadPhoto = () => {
    let canvas : any = document.getElementById('myphoto');
    let anchor : any = document.createElement('a');
    anchor.href = canvas.toDataURL('image/png'); 
    anchor.download = "myphoto.PNG";
    anchor.click();
  }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  return (
    <div className="camera-container">
      <div className="camera-video">
          <div className="description">
            <p>Cristian Alexander Gómez Guzmán - 201801480</p>
          </div>
          <div className="video">
            <video ref={videoRef}></video>
            <button onClick={takePhoto}>SNAP!</button>
            <button onClick={downloadPhoto}>DOWNLOAD</button>
          </div>
      </div>
      <div className="result">
        <canvas id="myphoto" ref={photoRef}></canvas>
      </div>
    </div>
  )
}
