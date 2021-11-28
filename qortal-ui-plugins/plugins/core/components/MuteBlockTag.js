import { LitElement, html, css } from 'lit-element'
import '@material/mwc-icon-button'
import {MuteBlockUser} from './MuteBlockUser.js'

//let mb = new MuteBlock()

class MuteBlockTag extends LitElement {

    static get properties() {
        return {
            concernedaddress: { type: String, attribute: true },
            concernedname: { type: String, attribute: true },
            hidemute:{ type: Boolean, attribute: true },
            hideblock:{ type: Boolean, attribute: true },
            blockedSenders: { type: Array },
            mutedUsers: { type: Array }
        }
    }

    static get styles() {
        return css``
    }

    updated(changedProps) {
        changedProps.forEach((OldProp, name) => {
            if (name === 'yyyyyy') {
                ////this.renderTime(this.timestamp)
            }
        });
    }

    constructor() {
        super();
        this.hidemute=true
        this.hideblock=true
        
    }

    render() {
        return html`
        <mwc-icon-button ?hidden="${this.hidemute}" class="btn-mute" title="Mute" icon="speaker_notes_off" @click="${()=>this.mute()}"></mwc-icon-button>
        <mwc-icon-button ?hidden="${(this.hideblock)}" class="btn-block" title="Ban" icon="person_off" @click="${()=>this.block()}"></mwc-icon-button>
        `
    }

    firstUpdated() {
        // ...
    }

    block(){// takes an address or an array of addresses to be blocked
        console.log("sending block call with data ")
        
        MuteBlockUser.block(this.concernedaddress,this.concernedname)
    }
     mute(){
        console.log("sending mute call with data ")
        //this.blockedSenders.push(addr)
        MuteBlockUser.mute(this.concernedaddress,this.concernedname)

    }
}

window.customElements.define('mute-block', MuteBlockTag)
