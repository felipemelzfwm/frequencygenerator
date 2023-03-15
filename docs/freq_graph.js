
export default class freqGraph extends HTMLElement {
    constructor(analyzer, canvas) {
		super();
		this.analyser = analyzer;
		this.canvas = canvas;
		this.canvasCtx = this.canvas.getContext("2d");

		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
		this.analyser.getByteTimeDomainData(this.dataArray);	
		this.drawOn = true;
	}

	draw = () => {
		if (this.drawOn)
			requestAnimationFrame(this.draw);
		this.analyser.getByteTimeDomainData(this.dataArray);
		this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
		this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvasCtx.lineWidth = 2;
		this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
		this.canvasCtx.beginPath();
		var sliceWidth = this.canvas.width * 1.0 / this.bufferLength;
		var x = 0;
		for(var i = 0; i < this.bufferLength; i++) {

			var v = this.dataArray[i] / 128.0;
			var y = v * this.canvas.height/2;

			if(i === 0) {
				this.canvasCtx.moveTo(x, y);
			} else {
				this.canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}
		this.canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
		this.canvasCtx.stroke();
	};

	turnDrawOff = () => {
		this.drawOn = false;
	}

	turnDrawOn = () => {
		this.drawOn = true;
		this.draw();
	}
}

customElements.define('freq-graph', freqGraph);
