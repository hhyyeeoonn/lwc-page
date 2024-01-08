import { LightningElement, wire, track } from 'lwc';
import COMPONENT_EXAMPLE from "@salesforce/messageChannel/LWC_Standard_Components__c";
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LwcStandardComponents extends LightningElement {
    @wire(MessageContext) 
    messageContext;

    subscription = null;
    pageName = '';
    value = '';

    inputOptions = {
        textInputDefault : true,
        textInputAdvanced : false,
        dateInput : false,
    }
   
    picklistOptions = {
        picklist : true,
        picklist2 : false,
        picklist3 : false,
    }

    radioOptions = {
        radio : true,
        radio2 : false,
        radio3 : false,
    }

    checkboxOptions = {
        checkbox : true,
        checkbox2 : false,
        checkbox3 : false,
    }

    textValue = '';
    dateValue;
    textValueField = '';

    inputType = true;
    picklistType = false;
    radioType = false;
    checkboxType = false;
    prevType = '';

    connectedCallback() {
        this.pageName = 'inputType';
        this.handleType(this.pageName);
        this.handleSubscribe();
    }

    handleSubscribe () {
        
        if (this.subscription) {
            console.log ('***fail');
            return;
        }

        this.subscription = subscribe (this.messageContext, COMPONENT_EXAMPLE, (message) => {
            this.prevType = this.pageName;
            this.pageName = message.pageName;
            this.handleType(this.pageName);
            console.log ('*** message.pageName : ' + message.pageName);
            console.log ('*** this.prevType : ' + this.prevType);
            console.log('*** this.value : ' + this.value);
            
        });
    }

    // 네비게이션바 조작
    handleType (pageType) {

        switch (pageType) {
            case 'inputType':
                this.inputType = true;
                this.picklistType = false;
                this.radioType = false;
                this.checkboxType = false;

                if (this.prevType !== 'inputType') {
                    this.value = 'textInputDefault';
                    this.inputOptions = {
                        textInputDefault : true,
                        textInputAdvanced : false,
                        dateInput : false,
                    }
                }
                break;
            
            case 'picklistType':
                this.inputType = false;
                this.picklistType = true;
                this.radioType = false;
                this.checkboxType = false;
                if (this.prevType !== 'picklistType') {
                    this.value = 'picklist';
                    this.picklistOptions = {
                        picklist : true,
                        picklist2 : false,
                        picklist3 : false,
                    }
                }
                break;
            
            case 'radioType':
                this.inputType = false;
                this.picklistType = false;
                this.radioType = true;
                this.checkboxType = false;
                if (this.prevType !== 'radioType') {
                    this.value = 'radio';
                    this.radioOptions = {
                        radio : true,
                        radio2 : false,
                        radio3 : false,
                    }
                }
                break;

            case 'checkboxType':
                this.inputType = false;
                this.picklistType = false;
                this.radioType = false;
                this.checkboxType = true;
                if(this.prevType !== 'checkboxType') {
                    this.value = 'checkbox';
                    this.checkboxOptions = {
                        checkbox : true,
                        checkbox2 : false,
                        checkbox3 : false,
                    }
                }
                break;
        }

        //return console.log('*** this.prevType2 : ' + this.prevType);
    }

    get options () {
        if(this.pageName === 'inputType') {
            return [
                {label : 'Text Input(default)', value : 'textInputDefault'},
                {label : 'Text Input(Advanced)', value : 'textInputAdvanced'},
                {label : 'Date Input', value : 'dateInput'},
            ];
        } else if (this.pageName === 'picklistType') {
            return [
                {label : 'picklist', value : 'picklist'},
                {label : 'picklist2', value : 'picklist2'},
                {label : 'picklist3', value : 'picklist3'},
            ]
        } else if (this.pageName === 'radioType') {
            return [
                {label : 'radio', value : 'radio'},
                {label : 'radio2', value : 'radio2'},
                {label : 'radio3', value : 'radio3'},
            ]
        } else if (this.pageName === 'checkboxType') {
            return [
                {label : 'checkbox', value : 'checkbox'},
                {label : 'checkbox2', value : 'checkbox2'},
                {label : 'checkbox3', value : 'checkbox3'},
            ]
        }
    }

// 옵션 선택시 하단 내용 변경
    handleChange (e) {
        this.value = e.detail.value;
        console.log ('*** this.value2 : ' + this.value);
        
        switch (this.value) {
            case 'textInputDefault':
                this.inputOptions = {
                    textInputDefault : true,
                    textInputAdvanced : false,
                    dateInput : false,
                }
                this.textValueField = '';
                break;
        
            case 'textInputAdvanced':
                this.inputOptions = {
                    textInputDefault : false,
                    textInputAdvanced : true,
                    dateInput : false,
                }
                this.textValueField = '';
                break;
            
            case 'dateInput':
                this.inputOptions = {
                    textInputDefault : false,
                    textInputAdvanced : false,
                    dateInput : true,
                }
                break;
            
            /*
            **************picklist
            */
            case 'picklist':
                this.picklistOptions = {
                    picklist : true,
                    picklist2 : false,
                    picklist3 : false,
                }
                break;
            
            case 'picklist2':
                this.picklistOptions = {
                    picklist : false,
                    picklist2 : true,
                    picklist3 : false,
                }
                break;

            case 'picklist3':
                this.picklistOptions = {
                    picklist : false,
                    picklist2 : false,
                    picklist3 : true,
                }
                break;
            
            /*
             *************radio 
             */
            case 'radio':
                this.radioOptions = {
                    radio : true,
                    radio2 : false,
                    radio3 : false,
                }
                break;
            
            case 'radio2':
                this.radioOptions = {
                    radio : false,
                    radio2 : true,
                    radio3 : false,
                }
                break;

            case 'radio3':
                this.radioOptions = {
                    radio : false,
                    radio2 : false,
                    radio3 : true,
                }
                break;

            /*
            *****************checkbox
            */
            case 'checkbox':
                this.checkboxOptions = {
                    checkbox : true,
                    checkbox2 : false,
                    checkbox3 : false,
                }
                break;
            
            case 'checkbox2':
                this.checkboxOptions = {
                    checkbox : false,
                    checkbox2 : true,
                    checkbox3 : false,
                }
                break;
            
            case 'checkbox3':
                this.checkboxOptions = {
                    checkbox : false,
                    checkbox2 : false,
                    checkbox3 : true,
                }
                break;
        }
    }

    handleInputBlur (e) {
        this.textValue = e.target.value;

        if (this.textInputAdvanced) this.textValueField = this.textValue;
        else this.textValueField = '';

        console.log ('*** textValue : ' + this.textValue);
    }

}