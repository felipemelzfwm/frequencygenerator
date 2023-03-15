export default class AudioContextModified extends AudioContext {
    constructor() {
        super();
        this.createOscillatorModified = () => {
            //new OscillatorNode();
            let result = this.createOscillator();
            return result;
        }

    }
}