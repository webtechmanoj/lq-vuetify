import IndirectInput from './IndirectInput'
import SelectMixin from './SelectMixin'

export default IndirectInput.extend({
    name: 'indirect-select',
    mixins: [SelectMixin],
    methods: {
        setValueOutSide(newValue) {
            IndirectInput.options.methods.setValueOutSide(this, newValue);
            this.broadCastToChild(newValue, true)
        },
        _whenStoreValueChange(newValue, outside) {
            this.isNeedToUpdateStore = false;
            this._updateInternalValue(newValue)
            const _outside = outside === undefined ? true : outside
            this.broadCastToChild(newValue, _outside)
            const selectedItem = newValue ? (!this.$helper.isArray(newValue) ? [newValue] : newValue) : [];
            this.response = this.response.concat(selectedItem);
            this.isNeedToUpdateStore = true;
        },
    }
})