export default class musical_notes {
	constructor() {
		this.notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
		this.freqs = [];
		this.f = this.f0 = 16.351;
		this.populateFreqsArray();
	}

	populateFreqsArray() {
		this.notes.map((note) => {
			let arr = [];
			for (let i=0; i<10; i++) {
				arr.push({
					'name': note + i,
					'freq': this.f
				});
				this.f = this.f*2;
			}
			this.freqs.push(arr);
			let pot = Math.pow(2, this.freqs.length/this.notes.length);
			this.f = this.f0 * pot;
		});
	}

	getFreqByNoteName(name) {
		const iMax = this.freqs.length;
		for (let i=0; i<iMax; i++) {
			let idx = this.freqs[i].findIndex(obj => obj.name == name);
			if (idx > -1)
				return this.freqs[i][idx]['freq'];
		}
	};

	getNoteNameByFreq(freq) {
		const iMax = this.freqs.length;
		for (let i=0; i<iMax; i++) { 
			let idx = this.freqs[i].findIndex(obj => Math.ceil(obj.freq) === Math.ceil(freq));
			if (idx > -1) {
				return this.freqs[i][idx]['name'];
			}
		}
	};

	printNotes() {
		const iMax = this.freqs.length;
        const jMax = this.freqs[0].length;
		for (let j=0; j<jMax; j++) {
			for (i=0; i<iMax; i++) {
				console.log(this.freqs[i][j]);
			}
		}
	}

	getFreqsArray() {
		return this.freqs;
	}
}



/*
You could also come up with a completely custom-calculated ramp by specifying the intermediate values as a Float32Array and scheduling it using setValueCurveAtTime(). Ex:
var waveArray = new Float32Array(9);
waveArray[0] = 0.5;
waveArray[1] = 1;
waveArray[2] = 0.5;
waveArray[3] = 0;
waveArray[4] = 0.5;
waveArray[5] = 1;
waveArray[6] = 0.5;
waveArray[7] = 0;
waveArray[8] = 0.5;

valueCurve.onclick = function() {
  gainNode.gain.setValueCurveAtTime(waveArray, audioCtx.currentTime, 2);
}
*/




