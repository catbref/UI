
import { LitElement, html, css } from 'lit-element'
import { render } from 'lit-html'
import { Epml } from '../../../epml.js'

import '@material/mwc-icon'
import '@material/mwc-button'

import '@vaadin/vaadin-grid/vaadin-grid.js'
import '@vaadin/vaadin-grid/theme/material/all-imports.js'

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class Websites extends LitElement {
    static get properties() {
        return {
            service: { type: String },
			identifier: { type: String },
            loading: { type: Boolean },
            resources: { type: Array },
            followedNames: { type: Array },
            selectedAddress: { type: Object },
        }
    }

    static get styles() {
        return css`
            * {
                --mdc-theme-primary: rgb(3, 169, 244);
                --paper-input-container-focus-color: var(--mdc-theme-primary);
            }
            #websites-list-page {
                background: #fff;
                padding: 12px 24px;
            }

            .divCard {
                border: 1px solid #eee;
                padding: 1em;
                /** box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.20); **/
                box-shadow: 0 .3px 1px 0 rgba(0,0,0,0.14), 0 1px 1px -1px rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.20);
                margin-bottom: 2em;
            }

            h2 {
                margin:0;
            }

            h2, h3, h4, h5 {
                color:#333;
                font-weight: 400;
            }

            a.visitSite {
                color: #000;
                text-decoration: none;
            }

            [hidden] {
                display: hidden !important;
                visibility: none !important;
            }
            .details {
                display: flex;
                font-size: 18px;
            }
            span {
                font-size: 18px;
                word-break: break-all;
            }
            select {
                padding: 13px 20px;
                width: 100%;
                font-size: 14px;
                color: #555;
                font-weight: 400;
            }
            .title {
                font-weight:600;
                font-size:12px;
                line-height: 32px;
                opacity: 0.66;
            }
            .itemList {
                padding:0;
            }
            /* .itemList > * {
                padding-left:24px;
                padding-right:24px;
            } */
        `
    }

    constructor() {
        super()
        this.service = "WEBSITE"
		this.identifier = null
        this.selectedAddress = {}
        this.resources = []
        this.followedNames = []
        this.isLoading = false
    }

    render() {
        return html`
            <div id="websites-list-page">
                <div style="min-height:48px; display: flex; padding-bottom: 6px; margin: 2px;">
                    <h2 style="margin: 0; flex: 1; padding-top: .1em; display: inline;">Browse Websites</h2>
                    <mwc-button style="float:right;" @click=${() => this.publishWebsite()}><mwc-icon>add</mwc-icon>Publish Website</mwc-button>
                </div>

                <div class="divCard">
                    <h3 style="margin: 0; margin-bottom: 1em; text-align: center;">Websites</h3>
                    <vaadin-grid id="resourcesGrid" style="height:auto;" ?hidden="${this.isEmptyArray(this.resources)}" aria-label="Websites" .items="${this.resources}" height-by-rows>
                        <!--<vaadin-grid-column path="name"></vaadin-grid-column>-->
                        <vaadin-grid-column header="Name" .renderer=${(root, column, data) => {
                            render(html`${this.renderName(data.item)}`, root)
                        }}></vaadin-grid-column>
                        <vaadin-grid-column width="10rem" flex-grow="0" header="Action" .renderer=${(root, column, data) => {
                            render(html`${this.renderFollowUnfollowButton(data.item)}`, root)
                        }}></vaadin-grid-column>
                    </vaadin-grid>
                    </vaadin-grid>
                    ${this.isEmptyArray(this.resources) ? html`
                        No websites available
                    `: ''}
                </div>
            </div>
        `
    }

    publishWebsite() {
        window.location.href = `publish/index.html?service=${this.service}&identifier=${this.identifier}&uploadType=path&category=Website&showService=false&showIdentifier=false`
    }

    async followName(websiteObj) {
        let name = websiteObj.name
        let items = [
            name
        ]
        let namesJsonString = JSON.stringify({"items": items})

        let ret = await parentEpml.request('apiCall', {
            url: '/lists/followed/names',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `${namesJsonString}`
        })

        if (ret === true) {
            // Successfully followed - add to local list
            // Remove it first by filtering the list - doing it this way ensures the UI updates
            // immediately, as apposed to only adding if it doesn't already exist
            this.followedNames = this.followedNames.filter(item => item != name); 
            this.followedNames.push(name)
        }
        else {
            parentEpml.request('showSnackBar', 'Error occurred when trying to follow this registered name. Please try again')
        }

        return ret
    }

    async unfollowName(websiteObj) {
        let name = websiteObj.name
        let items = [
            name
        ]
        let namesJsonString = JSON.stringify({"items": items})

        let ret = await parentEpml.request('apiCall', {
            url: '/lists/followed/names',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `${namesJsonString}`
        })

        if (ret === true) {
            // Successfully unfollowed - remove from local list
            this.followedNames = this.followedNames.filter(item => item != name); 
        }
        else {
            parentEpml.request('showSnackBar', 'Error occurred when trying to unfollow this registered name. Please try again')
        }

        return ret
    }

    renderRole(groupObj) {
        if (groupObj.owner === this.selectedAddress.address) {
            return "Owner"
        } else if (groupObj.isAdmin === true) {
            return "Admin"
        } else {
            return "Member"
        }
    }

    renderName(websiteObj) {
        let name = websiteObj.name
        
        return html`<a class="visitSite" href="browser/index.html?name=${name}&service=${this.service}">${name}</a>`
    }

    renderFollowUnfollowButton(websiteObj) {
        let name = websiteObj.name

        // Only show the follow/unfollow button if we have permission to modify the list on this node
        if (this.followedNames == null || !Array.isArray(this.followedNames)) {
            return html``
        }

        if (this.followedNames.indexOf(name) === -1) {
            // render follow button
            return html`<mwc-button @click=${() => this.followName(websiteObj)}><mwc-icon>add_to_queue</mwc-icon>&nbsp;Follow</mwc-button>`
        }
        else {
            // render unfollow button
            return html`<mwc-button @click=${() => this.unfollowName(websiteObj)}><mwc-icon>remove_from_queue</mwc-icon>&nbsp;Unfollow</mwc-button>`
        }
    }

    _textMenu(event) {

        const getSelectedText = () => {
            var text = "";
            if (typeof window.getSelection != "undefined") {
                text = window.getSelection().toString();
            } else if (typeof this.shadowRoot.selection != "undefined" && this.shadowRoot.selection.type == "Text") {
                text = this.shadowRoot.selection.createRange().text;
            }
            return text;
        }

        const checkSelectedTextAndShowMenu = () => {
            let selectedText = getSelectedText();
            if (selectedText && typeof selectedText === 'string') {

                let _eve = { pageX: event.pageX, pageY: event.pageY, clientX: event.clientX, clientY: event.clientY }

                let textMenuObject = { selectedText: selectedText, eventObject: _eve, isFrame: true }

                parentEpml.request('openCopyTextMenu', textMenuObject)
            }
        }

        checkSelectedTextAndShowMenu()
    }


    firstUpdated() {

        const getArbitraryResources = async () => {
            // this.resources = []

            let resources = await parentEpml.request('apiCall', {
                url: `/arbitrary/resources?service=${this.service}&default=true&limit=0&reverse=true`
            })

            this.resources = resources
            setTimeout(getArbitraryResources, this.config.user.nodeSettings.pingInterval)
        }

        const getFollowedNames = async () => {
            // this.followedNames = []

            let followedNames = await parentEpml.request('apiCall', {
                url: `/lists/followed/names`
            })

            this.followedNames = followedNames
            setTimeout(getFollowedNames, this.config.user.nodeSettings.pingInterval)
        }


        window.addEventListener("contextmenu", (event) => {

            event.preventDefault();
            this._textMenu(event)
        });

        window.addEventListener("click", () => {

            parentEpml.request('closeCopyTextMenu', null)
        });

        window.onkeyup = (e) => {
            if (e.keyCode === 27) {

                parentEpml.request('closeCopyTextMenu', null)
            }
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
                    setTimeout(getArbitraryResources, 1)
                    setTimeout(getFollowedNames, 1)
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


        parentEpml.imReady()
    }

    clearSelection() {

        window.getSelection().removeAllRanges()
        window.parent.getSelection().removeAllRanges()
    }

    isEmptyArray(arr) {
        if (!arr) { return true }
        return arr.length === 0
    }
}

window.customElements.define('websites-list', Websites)
