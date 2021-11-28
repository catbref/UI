//import { LitElement } from 'lit-element'

//import { connect } from '../../../../qortal-ui-core/node_modules/pwa-helpers'
//import { connect } from 'pwa-helpers'
//import { store } from '../../../../qortal-ui-core/src/store'
import { doSaveMutedUsers, doSaveBlockedUsers } from '../../../../qortal-ui-core/src/redux/user/user-actions.js'


let store = window.parent.reduxStore
 /*
 resetting the mute list
let payload={
    myAddress : store.getState().app.selectedAddress.address,
    users : {}
}
store.dispatch(doSaveMutedUsers(payload))

// */

export class MuteBlockUser{
    
    constructor() {
        MuteBlockUser.blockedUsers={}
        MuteBlockUser.mutedUsers={}
        MuteBlockUser.getBlockedUsers()
        MuteBlockUser.getMutedUsers()
    }

    static block(concernedaddress,concernedname){// takes an address or an array of addresses to be blocked
        //MuteBlockUser.blockedUsers=MuteBlockUser.getBlockedUsers()

        console.log("sending ban call with data ")
        console.log({addresses:concernedaddress, name:concernedname})
        let userDetails={
            address : concernedaddress,
            name : concernedname
        }
        MuteBlockUser.blockedUsers[concernedaddress]=userDetails

        MuteBlockUser.saveBlockedUsers(concernedaddress)

    }
    static mute(concernedaddress,concernedname){
        
        let userDetails={
            address : concernedaddress,
            name : concernedname
        }
        MuteBlockUser.mutedUsers[concernedaddress]=userDetails

        MuteBlockUser.saveMutedUsers(concernedaddress)
    }

     
    static filterBlockedUsers(unfilteredMessages){
        console.log("filter filterBlockedUsers")
        //MuteBlockUser.mutedUsers=MuteBlockUser.getMutedUsers()

        /*
            data: "v"
            isEncrypted: false
            isText: true
            reference: "46GXfXoNWWpK9Nt7ZYvkerS6YYfYvNEzKgF48yDzykXnyQ8VzLeaYS1W6n5b63SnjuJkSSQmXzAj8F6mQ5qNNnH3"
            sender: "QXE1uPMACFbFHCCQcBCgtSQbMDsDgH8opQ"
            senderName: "Lt. Dan"
            senderPublicKey: "ETt2xHuEHPmWgmhZ8y6EAYvYAzvPGmyg3Kfha5qXhm9f"
            signature: "tUvRuyhPvoZFmdnestTrnUcbHu3zKHcSJc5kprSKkXBgdueeq7Z4TnieNXNzCYEKiMZf96CsM6VGD58oLXLmX21"
            timestamp: 1628087128083
            txGroupId: 0
        */
       /*console.log(unfilteredMessages)
        let filteredMessages=Object.keys(unfilteredMessages)
        .filter(  (msg) => {
            return (MuteBlockUser.blockedUsers[msg.sender]===undefined && MuteBlockUser.mutedUsers[msg.sender]===undefined)
        })

        console.log(filteredMessages)
       return filteredMessages*/
       console.log(MuteBlockUser.blockedUsers)
       if(MuteBlockUser.blockedUsers!==undefined)  
            return unfilteredMessages.filter( (msg) => {       
                return (MuteBlockUser.blockedUsers!==undefined && MuteBlockUser.blockedUsers[msg.sender]===undefined && MuteBlockUser.blockedUsers[msg.sender]===undefined)
            })  
        else 
            return unfilteredMessages                
    }
    static filterMutedUsers(unfilteredMessages){
        console.log("filter filterMutedUsers")
        console.log(MuteBlockUser.mutedUsers)
        if(MuteBlockUser.mutedUsers!==undefined)  
            return unfilteredMessages.filter( (msg) => {  
                return ( MuteBlockUser.mutedUsers[msg.sender]===undefined && MuteBlockUser.mutedUsers[msg.sender]===undefined)
            }) 
        else 
            return unfilteredMessages       
    }
    static getMutedUsers(){
        MuteBlockUser.mutedUsers=store.getState().user.mutedUsers
        console.log(MuteBlockUser.mutedUsers)
        if(MuteBlockUser.mutedUsers!==undefined){
            MuteBlockUser.mutedUsers=MuteBlockUser.mutedUsers[store.getState().app.selectedAddress.address] ??  {} //if undefined or null then assign empty object 
        }else{
            MuteBlockUser.mutedUsers={}
        }

        console.log("getting mutedUSers")
        console.log(MuteBlockUser.mutedUsers)
        return MuteBlockUser.mutedUsers
   }
    static getBlockedUsers(){
        console.log("getting mutedUSers")

        MuteBlockUser.blockedUsers=store.getState().user.blockedUsers
        if(MuteBlockUser.blockedUsers!==undefined){
            MuteBlockUser.blockedUsers=MuteBlockUser.blockedUsers[store.getState().app.selectedAddress.address] ??  {} //if undefined or null then assign empty object 
        }else{
            MuteBlockUser.blockedUsers={}
        }
       return MuteBlockUser.blockedUsers
   }
   static saveBlockedUsers(concernedaddress){
    if(window.confirm('Are you sure you want to ban MuteBlockUser user?')) {
        //try {
        let payload={
            myAddress : store.getState().app.selectedAddress.address,
            users : MuteBlockUser.mutedUsers
        }
        store.dispatch(doSaveBlockedUsers(payload))

        parentEpml
            .request("apiCall", {
            url: `/lists/blacklist/address/`+concernedaddress,
            method: "POST",
            body: {}
            })
            .then((res) => {
                console.log(res)
                if(res.success){
                    console.log("successfully blocked"+addr)
                }
            });
        document.dispatchEvent(new CustomEvent('remove_recent_muted_blocked', {detail:{addr:concernedaddress}}));//remove the blocked user from the dom

    }
        
   }

   static saveMutedUsers(concernedaddress){
   
        if(window.confirm('Are you sure you want to mute MuteBlockUser user?')) {

                let payload={
                    myAddress : store.getState().app.selectedAddress.address,
                    users : MuteBlockUser.mutedUsers
                }
                store.dispatch(doSaveMutedUsers(payload))

                document.dispatchEvent(new CustomEvent('remove_recent_muted_blocked', {detail:{addr:concernedaddress}}));//remove the muted user from the dom

        }
   
    }
}
//export  {MuteBlockUser}