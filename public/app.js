import musical_notes from './musical_notes.js';
import audio_context from './audio_context.js';
import freq_graph from './freq_graph.js';
import bar_graph from './bar_graph.js';
import card_context from './card_context.js';

export default class app {
    constructor() {
        this.playBtt = document.getElementsByClassName('play-btt')[0];
        this.playBtt.onclick = () => {
            this.playBtt.disabled = true;

            this.m_nts = new musical_notes();
            console.log(this.m_nts.notes);

            this.a_ctx = new audio_context();
            
            this.startOscillator = document.createElement('button');
            this.startOscillator.innerText = 'Start Oscillator';
            this.startOscillator.addEventListener('click', () => this.a_ctx.osc.start(0) );
            document.body.append(this.startOscillator);

            this.startAudioProgramBtt = document.createElement('button');
            this.startAudioProgramBtt.innerText = 'Start Program';
            this.startAudioProgramBtt.addEventListener('click', () => this.a_ctx.startAudioProgram(this.m_nts.getFreqsArray()) );
            document.body.append(this.startAudioProgramBtt);

            this.stopAudioProgramBtt = document.createElement('button');
            this.stopAudioProgramBtt.innerText = 'Stop';
            this.stopAudioProgramBtt.addEventListener('click', () => this.a_ctx.stopOscillator() );
            document.body.append(this.stopAudioProgramBtt);


            this.freqSlider = this.a_ctx.createFreqSlider();
            document.body.append(this.freqSlider);
            
            this.volumeSlider = this.a_ctx.createVolumeSlider();
            document.body.append(this.volumeSlider);


            const bar_canvas = this.createCanvas ({width: 400, height: 150});
            document.body.append(bar_canvas);
            this.b_graph = new bar_graph(this.a_ctx.analyser, bar_canvas, this.a_ctx.getSampleRate());            
            this.b_graph.draw();


            const freq_canvas = this.createCanvas ({width: 400, height: 150});
            document.body.append(freq_canvas);
            this.f_graph = new freq_graph(this.a_ctx.analyser, freq_canvas);            
            this.f_graph.draw();



            this.notes_card = new card_context({tittle:"Musical note"});
            document.body.append(this.notes_card);
            this.notes_card.startUpdates({milliseconds: 1000, value: this.getNoteName})

            this.osc_freq_card = new card_context({tittle:"Input (Hz)"});
            document.body.append(this.osc_freq_card);
            this.osc_freq_card.startUpdates({milliseconds: 1000, value: this.a_ctx.getOscillatorFreq})

            this.analyzer_freq_card = new card_context({tittle:"Output (Hz)"});
            document.body.append(this.analyzer_freq_card);
            this.analyzer_freq_card.startUpdates({value: this.b_graph.getMaxFrequency})

            this.decibeis_card = new card_context({tittle:"dB"});
            document.body.append(this.decibeis_card);
            this.decibeis_card.startUpdates({value: this.b_graph.getMaxDecibel})
            


        }
    }

    getNoteName = () => {
        const freq = this.a_ctx.getOscillatorFreq();
        return this.m_nts.getNoteNameByFreq(freq);
    }

    createCanvas = ({width, height} = {width: 200, height: 200}) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").clearRect(0, 0, width, height);
        return canvas;
    }
}

const App = new app();
document.appObj = App;