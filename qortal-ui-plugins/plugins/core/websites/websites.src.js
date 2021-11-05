import { LitElement, html, css } from 'lit-element'
import { render } from 'lit-html'
import { Epml } from '../../../epml'

import '@material/mwc-button'
import '@material/mwc-textfield'
import '@material/mwc-select'
import '@material/mwc-list/mwc-list-item.js'
import '@material/mwc-slider'
import '@polymer/paper-progress/paper-progress.js'

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class WebsitesPage extends LitElement {
	static get properties() {
		return {
			names: { type: Array },
			registeredName: { type: String },
			selectedName: { type: String },
			path: { type: String },
			//selectedAddress: { type: Object },

			amount: { type: Number },
			errorMessage: { type: String },
			websitesLoading: { type: Boolean },
			btnDisable: { type: Boolean },
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
				<div class="layout horizontal center" style=" padding:12px 15px;">
					<paper-card style="width:100%; max-width:740px;">
						<div style="background-color: ${this.selectedAddress.color}; margin:0; color: ${this.textColor(this.selectedAddress.textColor)};">
							<h3 style="margin:0; padding:8px 0;">Publish / Update Website</h3>
						</div>
					</paper-card>
					<p>
						<mwc-select id="registeredName" label="Select Name" index="0" @selected=${(e) => this.selectName(e)} style="min-width: 130px; max-width:100%; width:100%;">
							<mwc-list-item value="${this.registeredName}">${this.registeredName}</mwc-list-item>
						</mwc-select>
					</p>
					<p>
						<mwc-textfield style="width:100%;" label="Local path to static files" id="path" type="text" value="${this.path}"></mwc-textfield>
					</p>

					<p style="color:red">${this.errorMessage}</p>
					<p style="color:green;word-break: break-word;">${this.successMessage}</p>

					${this.websitesLoading ? html` <paper-progress indeterminate style="width:100%; margin:4px;"></paper-progress> ` : ''}

					<div class="buttons">
						<div>
							<mwc-button ?disabled=${this.btnDisable} style="width:100%;" raised icon="send" @click=${(e) => this.doPublish(e)}>Publish &nbsp;</mwc-button>
						</div>
					</div>
				</div>
			</div>
		`
	}


	doPublish(e) {
		let registeredName = this.shadowRoot.getElementById('registeredName').value
		let path = this.shadowRoot.getElementById('path').value

		if (registeredName === '') {
			parentEpml.request('showSnackBar', 'Please select a registered name to publish data for')
	    }
		else if (path === '') {
		 	parentEpml.request('showSnackBar', 'Please enter a path to the directory containing the static website')
		}
		else {
			this.publishWebsite()
		}
	}

	async publishWebsite() {
		let registeredName = this.shadowRoot.getElementById('registeredName').value
		let path = this.shadowRoot.getElementById('path').value

		this.websitesLoading = true
		this.btnDisable = true

		const validateName = async (receiverName) => {
			let nameRes = await parentEpml.request('apiCall', {
				type: 'api',
				url: `/names/${receiverName}`,
			})

			return nameRes
		}

		const showError = async (errorMessage) => {
			this.websitesLoading = false
			this.btnDisable = false
			this.successMessage = ''
			console.error(errorMessage)
		}

		const validate = async () => {
			let validNameRes = await validateName(registeredName)
			if (validNameRes.error) {
				this.errorMessage = "Error: " + validNameRes.message
				showError(this.errorMessage)
				throw new Error(this.errorMessage);
			}

			let transactionBytes = await uploadData(registeredName, path)
			if (transactionBytes.error) {
				this.errorMessage = "Error: " + transactionBytes.message
				showError(this.errorMessage)
				throw new Error(this.errorMessage);
			}

			let signAndProcessRes = await signAndProcess(transactionBytes)
			if (signAndProcessRes.error) {
				this.errorMessage = "Error: " + signAndProcessRes.message
				showError(this.errorMessage)
				throw new Error(this.errorMessage);
			}

			this.btnDisable = false
			this.websitesLoading = false
			this.errorMessage = ''
			this.successMessage = 'Transaction successful!'
		}

		const uploadData = async (registeredName, path) => {
			let uploadDataRes = await parentEpml.request('apiCall', {
				type: 'api',
				method: 'POST',
				url: `/arbitrary/WEBSITE/${registeredName}`,
				body: `${path}`,
			})

			return uploadDataRes
		}

		const convertBytesForSigning = async (transactionBytesBase58) => {
			let convertedBytes = await parentEpml.request('apiCall', {
				type: 'api',
				method: 'POST',
				url: `/transactions/convert`,
				body: `${transactionBytesBase58}`,
			})

			return convertedBytes
		}

		const signAndProcess = async (transactionBytesBase58) => {
			let convertedBytesBase58 = await convertBytesForSigning(transactionBytesBase58)
			if (convertedBytesBase58.error) {
				this.errorMessage = "Error: " + convertedBytesBase58.message
				showError(this.errorMessage)
				throw new Error(this.errorMessage);
			}

			let nonce = 1 // TODO: this is currently ignored

			console.log(this.selectedAddress)

			let response = await parentEpml.request('sign_arbitrary', {
                nonce: this.selectedAddress.nonce,
                arbitraryBytesBase58: transactionBytesBase58,
				arbitraryBytesForSigningBase58: convertedBytesBase58,
                arbitraryNonce: nonce
            })

			let myResponse = { error: '' }
			if (response === false) {
				myResponse.error = "Unable to sign and process transaction"
			}
			else {
				myResponse = response
			}

			return myResponse
		}

		validate()
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
		this.names = []
		this.registeredName = ''
		this.selectedName = 'invalid'
		this.path = ''
		//this.selectedAddress = {}
		this.errorMessage = ''
		this.websitesLoading = false
		this.btnDisable = false

		const fetchNames = () => {
            console.log('=========================================')
            parentEpml.request('apiCall', {
                url: `/names/address/${this.selectedAddress.address}?limit=0&reverse=true`
            }).then(res => {

                setTimeout(() => {
					this.names = res
					this.registeredName = res[0].name;
				}, 1)
				console.log(res)
            })
            setTimeout(fetchNames, this.config.user.nodeSettings.pingInterval)
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
                if (!configLoaded) {
                    setTimeout(fetchNames, 1)
                    configLoaded = true
                }
                this.config = JSON.parse(c)
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

	selectName(e) {
		const name = this.shadowRoot.getElementById('registeredName').innerHTML
		this.selectedName = name
	}

	clearSelection() {
		window.getSelection().removeAllRanges()
		window.parent.getSelection().removeAllRanges()
	}
}

window.customElements.define('websites-page', WebsitesPage)
