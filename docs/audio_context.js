export default class audio_context {
    constructor() {
        this.audioCtx = new AudioContext();
        this.gainNode = this.audioCtx.createGain();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10; 
        this.analyser.decibelsDelta = this.analyser.maxDecibels - this.analyser.minDecibels;
        this.createAndConnectOscillator();
    }

    createAndConnectOscillator = () => {
        this.osc = this.audioCtx.createOscillator();
        //this.osc.addEventListener()

        this.osc.connect(this.gainNode);

        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
    }

        //source = audioCtx.createMediaStreamSource(stream);		
		//analyser.connect(distortion);
		//distortion.connect(audioCtx.destination);
    getSampleRate = () => {
        return this.audioCtx.sampleRate;
    }

    setGain = (value) => {
        this.gainNode.gain.value = value;	//between -1 and 1
        //But if you do send signals beyond the [-1, 1] limit to the destination, you may start to hear clipping. This is the result of the sine wave's peaks being squared off when they fall beyond the supported range. The resulting waveform is very different from the original and also sounds completely different.   
    }

    setDetune = (value) => {
        this.osc.detune.value = val;
    }

    setOscillatorWaveForm = (type) => {
        //"sine", "square", "sawtooth", "triangle" and "custom"
        this.osc.type = type;
    }

    getOscillatorFreq = () => {
        //this.setFreqSlider(this.osc.frequency.value);
        return this.osc.frequency.value;
    }

    setAudioProgram = (freqs) => {
        this.osc.frequency.setValueAtTime(this.osc.frequency.value, this.audioCtx.currentTime)
		let x, y, cont = 1;
        const iMax = freqs.length;
        const jMax = freqs[0].length;
		for (let j=0; j<jMax; j++) {
			for (let i=0; i<iMax; i++) {
				//osc.frequency.setValueAtTime(freqs[i][j]['freq'], cont);
				//console.log(freqs[i][j]);
				if (j==jMax-1) {
					if (i==iMax-1) {                        
						console.log('cont: ', cont);
						return;
					}
					else {
						x = i+1;
						y = j;
					}
				}
				else {
					if (i==iMax-1) {
						x = 0;
						y = j+1;
					}
					else {
						x = i+1;
						y = j;
					}
				}
				cont++;
				this.osc.frequency.exponentialRampToValueAtTime(freqs[x][y]['freq'], this.audioCtx.currentTime + cont/10);
				console.log(freqs[x][y]);
				cont++;
			}
		}
		return cont;
	}

    startAudioProgram = (freqs) => {
        //this.programRunning = true;
        this.setAudioProgram(freqs);
        this.osc.start(0);
    }

    stopOscillator = () => {
        this.osc.stop();
        this.createAndConnectOscillator();
    }

    createFreqSlider = ({minFreq, maxFreq, startValue} = {minFreq: 1, maxFreq: 30000, startValue: 400}) => {
        this.freqSlider = document.createElement('input');
        this.freqSlider.setAttribute('type', 'range');
        this.freqSlider.setAttribute('min', minFreq);
        this.freqSlider.setAttribute('max', maxFreq);
        this.freqSlider.style.width = '100%';
        this.freqSlider.value = startValue;
        this.freqSlider.addEventListener('input', (e) => {
            //if (!this.programRunning)
            this.osc.frequency.value = e.target.value;
        })
        return this.freqSlider;
    }

    setFreqSlider = (value) => {
        this.freqSlider.value = value;
    }

    createVolumeSlider = () => {
        this.volumeSlider = document.createElement('input');
        this.volumeSlider.setAttribute('type', 'range');
        this.volumeSlider.setAttribute('min', 0);
        this.volumeSlider.setAttribute('max', 1);
        this.volumeSlider.setAttribute('step', 0.01);
        this.volumeSlider.style.width = '25%';
        this.volumeSlider.value = 0.7;
        this.volumeSlider.addEventListener('input', (e) => {
            this.setGain(e.target.value);
        })
        return this.volumeSlider;
    }

    /* addOscFreqValueListener = () => {
        this.osc.frequency.value
    }
    */
    
}


/*
    setInterval = (freqs) => {
        this.id = setInterval(() => {
                console.log('freq: ', this.osc.frequency.value);
                if (Math.ceil(this.osc.frequency.value*1000)/1000 == Math.ceil(freqs[11][9]['freq']*1000)/1000) {
                    console.log('clearing interval');
                clearInterval(this.id);
            }
        }, 300);
    }
    
    removeInterval = () => {
        clearInterval(this.id);
    }*/