const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const b2text = blob => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = e => resolve(e.srcElement.result)
    reader.readAsDataURL(blob)
})

export var record = time => new Promise(async resolve => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    let recorder = new MediaRecorder(stream)
    let chunks = []
    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.start()
    let stopRecording = () => {
        recorder.stop()
    }
    await sleep(time)
    recorder.onstop = async () => {
        let blob = new Blob(chunks)
        let text = await b2text(blob)
        resolve(text)
        alert('terminou')
    }
    return stopRecording;
})
