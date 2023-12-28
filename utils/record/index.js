const b2text = blob => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = e => resolve(e.srcElement.result)
    reader.readAsDataURL(blob)
})

let recorder;
let timeOut;

export var record = (time, setStart, setText, setAudio, setPlay) => new Promise(async resolve => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recorder = new MediaRecorder(stream)
    let chunks = []
    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.start()
    recorder.onstop = async () => {
        let blob = new Blob(chunks)
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.addEventListener("ended", function (e) {
            setPlay(false)
        });
        audio.addEventListener('pause', function (e) {
            setPlay(false)
        });
        audio.addEventListener("play", function (e) {
            setPlay(true)
        });
        let text = await b2text(blob)
        console.log(text)
        setAudio(audio)
        setText(text)
        setStart(false)
        alert('terminou')
    }
    timeOut = setTimeout(() => recorder.stop(), time);
})

export var stopRecordingEarly = () => {
    if (recorder) {
        clearTimeout(timeOut);
        recorder.stop();
    }
}