import { LightningElement, track } from 'lwc';

export default class InputPage extends LightningElement {
    /*
    @track tabs = [
        { label: 'Item One', value: 'tab__item-one', content: 'Item One Content' },
        { label: 'Item Two', value: 'tab__item-two', content: 'Item Two Content' },
        { label: 'Item Three', value: 'tab__item-three', content: 'Item Three Content' }
    ];

    selectedTab = 'tab__item-one';
    */
    
    /*
    get tabItemClass() {
        return 'slds-tabs_default__item tab__items' + (this.selectedTab === this.item.value ? ' slds-is-active' : '');
    }

    get tabIndex() {
        return this.selectedTab === this.item.value ? '0' : '-1';
    }

    get isSelected() {
        return this.selectedTab === this.item.value ? 'true' : 'false';
    }

    get tabContentClass() {
        return 'slds-tabs_default__content' + (this.selectedTab === this.item.value ? ' slds-show' : ' slds-hide');
    }

    handleTabClick(event) {
        this.selectedTab = event.currentTarget.dataset.tabId;
    }
   */

    value = 'textInputDefault';

    textInputDefault = true;
    textInputAdvanced = false;
    dateInput = false;

    textValue = '';
    dateValue;
    textValueField = '';

    get options() {
        return [
            {label : 'Text Input(default)', value : 'textInputDefault'},
            {label : 'Text Input(Advanced)', value : 'textInputAdvanced'},
            {label : 'Date Input', value : 'dateInput'},
        ];
    }

    handleChange(e) {
        this.value = e.detail.value;

        switch(this.value) {
            case 'textInputDefault':
                this.textInputDefault = true;
                this.textInputAdvanced = false;
                this.dateInput = false;
                break;

            case 'textInputAdvanced':
                this.textInputDefault = false;
                this.textInputAdvanced = true;
                this.dateInput = false;
                this.textValueField = '';
                break;

            case 'dateInput':
                this.textInputDefault = false;
                this.textInputAdvanced = false;
                this.dateInput = true;
                break;
        }
    }

    handleInputBlur(e) {
        this.textValue = e.target.value;
        
        if(this.textInputAdvanced) this.textValueField = this.textValue; 
        else this.textValueField = '';

        console.log(':::::textValue: ' + this.textValue + ':::::');
    }

}

