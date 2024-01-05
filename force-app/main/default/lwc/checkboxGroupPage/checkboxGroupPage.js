import { LightningElement, api } from 'lwc';
import COMPONENT_EXAMPLE from "@salesforce/messageChannel/LWC_Standard_Components__c";

export default class CheckboxGroupPage extends LightningElement {
    @api pageName;
    
    connectedCallback() {
        console.log(this.pageName);
    }
}