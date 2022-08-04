export default class card_context extends HTMLElement {
    constructor({tittle, _value} = {tittle: 'Tittle', _value: 'value'}) {
        super();

        this.tittleEl = document.createElement('h1');
        this.tittleEl.innerText = tittle;
        this.appendChild(this.tittleEl);

        this.valueEl = document.createElement('h2');
        this.valueEl.innerText = _value;
        this.appendChild(this.valueEl);

    }

    updateCard = ({tittle, value}={tittle:null, value:null}) => {
        if (tittle)
            this.tittleEl.innerText = tittle;
        if (value)
            this.valueEl.innerText = value;
    }

    startUpdates = ({milliseconds, value}={milliseconds: 500, value:()=>'value'}) => {
        this.updatesId = setInterval(() => {
            this.updateCard({value:value()});
        }, milliseconds);
    }

    stopUpdates = () => {
        clearInterval(this.updatesId);
    }

}

customElements.define('card-context', card_context);