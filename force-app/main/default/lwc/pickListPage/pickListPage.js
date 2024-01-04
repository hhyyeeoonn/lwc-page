import { LightningElement } from 'lwc';

export default class PickListPage extends LightningElement {
    value = '';
    get options() {
        return [
            {label : '', value : ''},
            {label : '', value : ''},
            {label : '', value : 'dateInp'},
        ];
    }
}