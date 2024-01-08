import { LightningElement, wire } from 'lwc'
import { NavigationMixin } from 'lightning/navigation';
import COMPONENT_EXAMPLE from "@salesforce/messageChannel/LWC_Standard_Components__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class NaviComponent extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;

    namedPageRef;
    namedPageUrl;
    
    handleMessage (page) {
        let message = {
            pageName : page
        };
        console.log(message.pageName);
        publish(this.messageContext, COMPONENT_EXAMPLE, message);
    }


    async connectedCallback() {
        /*
        this.namedPageRef = {
            type : 'comm__namedPage',
            attributes : {
                name : 'PickList__c'
            },
        }

        
        // 페이지 이동하기 NavigationMixin.GenerateUrl : url 생성됨
        this[NavigationMixin.GenerateUrl](this.namedPageRef).then((url) => (this.namedPageUrl = url));
        */
    }

    // 페이지 이동하기 NavigationMixin.Navigate : 페이지로 이동
    navigateToInput() {
        this.handleMessage ('inputType');
        /*
        this[NavigationMixin.Navigate]({
            type : 'comm__namedPage',
            attributes : {
                name : 'Home'
            },
        });
        */
    }

    clickPickList() {
        this.handleMessage ('picklistType');
        
        /*
        //location.href = this.namedPageUrl; 페이지가 새로고침됨
        this[NavigationMixin.Navigate](this.namedPageRef);
        */
    }

    navigateToRadio() {
        this.handleMessage ('radioType');

        /*
        this[NavigationMixin.Navigate]({
            type : 'comm__namedPage',
            attributes : {
                name : 'RadioGroup__c'
            },
        })
        */
    }

    navigateToCheckbox(e) {
        this.handleMessage ('checkboxType');

        /*
        this[NavigationMixin.Navigate]({
            type : 'comm__namedPage',
            attributes : {
                name : 'CheckboxGroup__c'
            },
        })
        */
    }
}