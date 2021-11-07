import { LitElement, html, css } from 'lit-element'
import { render } from 'lit-html'
import { Epml } from '../../../../epml'

import '@material/mwc-button'
import '@material/mwc-textfield'
import '@material/mwc-select'
import '@material/mwc-list/mwc-list-item.js'
import '@material/mwc-slider'
import '@polymer/paper-progress/paper-progress.js'

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class WebBrowser extends LitElement {
	static get properties() {
		return {
			url: { type: String },
		}
	}

	static get observers() {
		return ['_kmxKeyUp(amount)']
	}

	static get styles() {
		return css`
			* {
				--mdc-theme-primary: rgb(3, 169, 244);
				--mdc-theme-secondary: var(--mdc-theme-primary);
				--paper-input-container-focus-color: var(--mdc-theme-primary);
			}

			#websitesWrapper paper-button {
				float: right;
			}

			#websitesWrapper .buttons {
				/* --paper-button-ink-color: var(--paper-green-500);
                    color: var(--paper-green-500); */
				width: auto !important;
			}

			.address-bar {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 100px;
				background-color: white;
			}

			.iframe-container {
				position: absolute;
				top: 0; /* To enable address bar, set to 40px or similar */
				left: 0;
				right: 0;
				bottom: 0;
			}

			.iframe-container iframe {
				display: block;
				width: 100%;
				height: 100%;
				border: none;
			}

			mwc-textfield {
				margin: 0;
			}

			paper-progress {
				--paper-progress-active-color: var(--mdc-theme-primary);
			}
		`
	}

	render() {
		return html`
			<div id="websitesWrapper" style="width:auto; padding:10px; background: #fff; height:100vh;">
				<div class="layout horizontal center">
					<div class="address-bar">
						<!-- TODO: address bar goes here -->
					</div>
					<div class="iframe-container">
						<iframe id="browser-iframe" src="${this.url}">
							Your browser doesn't support iframes
						</iframe>
					</div>
				</div>
			</div>
		`
	}


	// Helper Functions (Re-Used in Most part of the UI )

	textColor(color) {
		return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
	}

	_textMenu(event) {
		const getSelectedText = () => {
			var text = ''
			if (typeof window.getSelection != 'undefined') {
				text = window.getSelection().toString()
			} else if (typeof this.shadowRoot.selection != 'undefined' && this.shadowRoot.selection.type == 'Text') {
				text = this.shadowRoot.selection.createRange().text
			}
			return text
		}

		const checkSelectedTextAndShowMenu = () => {
			let selectedText = getSelectedText()
			if (selectedText && typeof selectedText === 'string') {
				let _eve = { pageX: event.pageX, pageY: event.pageY, clientX: event.clientX, clientY: event.clientY }

				let textMenuObject = { selectedText: selectedText, eventObject: _eve, isFrame: true }

				parentEpml.request('openCopyTextMenu', textMenuObject)
			}
		}

		checkSelectedTextAndShowMenu()
	}

	constructor() {
		super()
		this.url = 'about:blank'

		const displayWebpage = () => {
            const urlParams = new URLSearchParams(window.location.search);
			const name = urlParams.get('name');
			const node = "http://127.0.0.1:12393" // TODO: make this dynamic
			this.url = node + "/site/" + name;
        }

		let configLoaded = false
        parentEpml.ready().then(() => {
            parentEpml.subscribe('selected_address', async selectedAddress => {
                this.selectedAddress = {}
                selectedAddress = JSON.parse(selectedAddress)
                if (!selectedAddress || Object.entries(selectedAddress).length === 0) return
                this.selectedAddress = selectedAddress
            })
            parentEpml.subscribe('config', c => {
				this.config = JSON.parse(c)
                if (!configLoaded) {
					console.log("config: " + c);
                    displayWebpage()
                    configLoaded = true
                }
            })
            parentEpml.subscribe('copy_menu_switch', async value => {

                if (value === 'false' && window.getSelection().toString().length !== 0) {

                    this.clearSelection()
                }
            })
        })
	}

	firstUpdated() {

		window.addEventListener('contextmenu', (event) => {
			event.preventDefault()
			this._textMenu(event)
		})

		window.addEventListener('click', () => {
			parentEpml.request('closeCopyTextMenu', null)
		})

		window.onkeyup = (e) => {
			if (e.keyCode === 27) {
				parentEpml.request('closeCopyTextMenu', null)
			}
		}
	}

	clearSelection() {
		window.getSelection().removeAllRanges()
		window.parent.getSelection().removeAllRanges()
	}
}

window.customElements.define('web-browser', WebBrowser)
