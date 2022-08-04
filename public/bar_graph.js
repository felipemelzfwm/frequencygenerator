export default class barGraph extends HTMLElement {
    constructor(analyzer, canvas, sampleRate) {
		super();
		this.analyser = analyzer;
		this.canvas = canvas;
        this.sampleRate = sampleRate;
		this.canvasCtx = this.canvas.getContext("2d");

        this.maxFreqDecibelStatus = {
            ocurrencies: null, 
            decibeis: null, 
            frequency: null
        }

		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
        this.datafreqArray = [];
        const step = this.sampleRate / (2 * this.bufferLength);
        console.log(step);
        var acc = 0;
        for(var i = 0; i < this.bufferLength; i++) {
            this.datafreqArray.push(acc);
            acc += step;
        };
        console.log('this.datafreqArray:');
        console.log(this.datafreqArray);
		this.drawOn = true;
	}

	draw = () => {
		if (this.drawOn)
			requestAnimationFrame(this.draw);
		this.analyser.getByteFrequencyData(this.dataArray);
		this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
		this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
        const barWidth = (this.canvas.width / this.bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for(var i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i];

            this.canvasCtx.fillStyle = 'rgb(' + ( barHeight + 100 ) + ',50,50)';
            this.canvasCtx.fillRect(x, this.canvas.height-barHeight/2, barWidth, barHeight/2);

            x += barWidth + 1;
        }
        this.updateMaxFreqDecibelStatus();
	};

	turnDrawOff = () => {
		this.drawOn = false;
	}

	turnDrawOn = () => {
		this.drawOn = true;
		this.draw();
	}

    getFreqsArray = () => {
        return this.datafreqArray;
    }

    getDecibeisArray = () => {
        return  this.dataArray;
    }

    getMaxDecibel = () => { 
        return this.maxFreqDecibelStatus.decibeis;
    }

    getMaxFrequency = () => {
        return this.maxFreqDecibelStatus.frequency;
    }

    getMaxOcurrencies = () => {
        return this.maxFreqDecibelStatus.ocurrencies;
    }

    updateMaxFreqDecibelStatus = () => {
        var cont = 0;
        var index = -1;
        const value = this.dataArray.reduce( (acc, item, idx) => {
            if (!acc) {
                acc = 0;
            }
            if(item > acc) {
                cont = 1;
                index = idx;
                return item;
            }
            else if (item === acc) {
                cont++;
                index = idx;
                return item;
            }
            else {
                return  acc;
            }
        }, this.dataArray[0]);
        this.maxFreqDecibelStatus = {
            ocurrencies: cont, 
            decibeis: this.analyser.maxDecibels - this.analyser.decibelsDelta * (value / 255), 
            frequency: this.datafreqArray[index]
        }
    }
}

customElements.define('bar-graph', barGraph);
