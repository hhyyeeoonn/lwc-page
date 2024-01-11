import { LightningElement, wire, track } from 'lwc';
import COMPONENT_EXAMPLE from "@salesforce/messageChannel/LWC_Standard_Components__c";
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LwcStandardComponents extends LightningElement {
    @wire(MessageContext) 
    messageContext; // lightning message service를 사용하는 ligntning web component의 정보를 제공하는 객체

    subscription = null;
    pageName = ''; //네비 선택시 넘어오는 페이지 값
    value = '';

    inputOptions = {
        textInputDefault : true,
        textInputAdvanced : false,
        dateInput : false,
    }
   
    picklistOptions = {
        picklistBasicCombobox : true,
        picklist2 : false,
        picklist3 : false,
    }

    radioOptions = {
        radioBasicRadio : true,
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

    exampleOptionValue = '';

    inputType = true;
    picklistType = false;
    radioType = false;
    checkboxType = false;
    prevType = '';

    connectedCallback () {
        this.pageName = 'inputType';
        this.handleType (this.pageName);
        this.handleSubscribe ();
    }

    handleSubscribe () {
        
        if (this.subscription) {
            console.log ('*** fail');
            return;
        }

        // message : 구독자에게 게시된 메시지를 포함하는 직렬화 가능한 JSON 개체임 메시지에 함수나 심볼을 포함할 수 없다
        this.subscription = subscribe (this.messageContext, COMPONENT_EXAMPLE, (message) => {
            this.prevType = this.pageName;
            this.pageName = message.pageName;
            this.handleType(this.pageName);
            console.log ('*** message.pageName : ' + message.pageName);
            console.log ('*** this.prevType : ' + this.prevType);
            console.log ('*** this.value : ' + this.value);
            
        });
    }

    // 네비게이션바 조작
    handleType (pageType) {

        this.inputType = pageType === 'inputType';
        this.picklistType = pageType === 'picklistType';
        this.radioType = pageType === 'radioType';
        this.checkboxType = pageType === 'checkboxType';

        //타입이 선택되면 기본으로 보여질 값
        switch (pageType) {
            case 'inputType':
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
                if (this.prevType !== 'picklistType') {
                    this.value = 'picklistBasicCombobox';
                    this.picklistOptions = {
                        picklistBasicCombobox : true,
                        picklist2 : false,
                        picklist3 : false,
                    }
                }
                break;
            
            case 'radioType':
                if (this.prevType !== 'radioType') {
                    this.value = 'radioBasicRadio';
                    this.radioOptions = {
                        radioBasicRadio : true,
                        radio2 : false,
                        radio3 : false,
                    }
                }
                break;

            case 'checkboxType':
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
                {label : 'Basic Combobox', value : 'picklistBasicCombobox'},
                {label : 'picklist2', value : 'picklist2'},
                {label : 'picklist3', value : 'picklist3'},
            ]
        } else if (this.pageName === 'radioType') {
            return [
                {label : 'Basic Radio', value : 'radioBasicRadio'},
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

    textInputDefaultOptions = [
        {id : 'defaultValue1', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : ''},
        {id : 'defaultValue2', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : 'Input Text!'},
        {id : 'defaultValue3', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : '', placeholder : 'type here'},
        {id : 'defaultValue4', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : '', placeholder : 'type here', required : 'required'},
        {id : 'defaultValue5', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : '', placeholder : 'type here', disabled : 'disabled'},
        {id : 'defaultValue6', class : 'slds-p-around_medium lgc-bg', type : 'text', label : 'Enter some text', value : 'DK BMC', readonly : 'readonly'},
    ]; 

    picklistBasicComboboxOptions = [
        {label : 'New', value : 'new'},
        {label : 'In Progress', value : 'inProgress'},
        {label : 'Finished', value : 'finished'},
    ];

    radioBasicRadioOptions = [
        {label : 'Sales', value : 'option1'},
        {label : 'Force', value : 'option2'},
    ]


    get exampleValue () {
        if (this.value === 'textInputDefault') {
            return this.textInputDefaultOptions;
        } else if (this.value === 'picklistBasicCombobox') {
            return this.picklistBasicComboboxOptions;
        } else if (this.value === 'radioBasicRadio') {
            return this.radioBasicRadioOptions;
        }
    }

// 옵션 선택시 하단 내용 변경
    handleOptionChange (e) {
        this.value = e.detail.value;
        console.log ('*** this.value2 : ' + this.value);
        
        this.inputOptions.textInputDefault = this.value === 'textInputDefault';
        this.inputOptions.textInputAdvanced = this.value === 'textInputAdvanced';
        this.inputOptions.dateInput = this.value === 'dateInput';

        if(this.value === 'textInputDefault' || this.value === 'textInputAdvanced') this.textValueField = '';

        this.picklistOptions.picklistBasicCombobox = this.value === 'picklistBasicCombobox';
        this.picklistOptions.picklist2 = this.value === 'picklist2';
        this.picklistOptions.picklist3 = this.value === 'picklist3';

        this.radioOptions.radioBasicRadio = this.value === 'radioBasicRadio';
        this.radioOptions.radio2 = this.value === 'radio2';
        this.radioOptions.radio3 = this.value === 'radio3';

        this.checkboxOptions.checkbox = this.value === 'checkbox';
        this.checkboxOptions.checkbox2 = this.value === 'checkbox2';
        this.checkboxOptions.checkbox3 = this.value === 'checkbox3';
        
    }

    handleExampleValueChange (e) {
        if(this.value === 'picklistBasicCombobox') {
            this.exampleOptionValue = e.detail.value;
        } else if (this.value === 'radioBasicRadio') {
            this.exampleOptionValue = e.detail.value;
        }
    }
    
    handleInputBlur (e) {
        this.textValue = e.target.value;

        if (this.inputOptions.textInputAdvanced) this.textValueField = this.textValue;
        else this.textValueField = '';

        console.log ('*** textValue : ' + this.textValue);
    }
}