import { LightningElement, track, wire } from 'lwc';
import COMPONENT_EXAMPLE from "@salesforce/messageChannel/LWC_Standard_Components__c";
import { subscribe, MessageContext } from 'lightning/messageService';

export default class PickListPage extends LightningElement {
    
    @wire(MessageContext) 
    messageContext;
    
    subscription = null;
    pageName = '';
    value = '';
    
    connectedCallback() {
        this.handleSubscribe();
        console.log('pageName2: ' + this.pageName);
        console.log('subscription: ' + this.subscription);
    }
    
    handleSubscribe() {
        if(this.subscription) {
            console.log('fail');
            return;
        }
        this.subscription = subscribe(this.messageContext, COMPONENT_EXAMPLE, (message) => {
            this.pageName = message.pageName;
            console.log('message.pageName: ' + message.pageName);
        });
        console.log('pageName1: ' + this.pageName);
    }


    get options() {
        return [
            {label : '', value : ''},
            {label : '', value : ''},
            {label : '', value : 'dateInp'},
        ];
    }
}