export default class OscillatorModified extends OscillatorNode {
    constructor() {
        super();
        this.frequency = new AudioParam();
        Object.defineProperty(this.frequency, 'value', {
            get: function () {
                return this.value;
            },
            set: function (valor) {
                this.value = valor;
            }
        });
    }
}
/*
class AudioParamModified extends AudioParam {
    constructor() {
        super();
        this.value
        this.value = {
            get = function () {
                return this;
            },
            set = function (value) {
                this = value;
            }

        }
    }
}*/