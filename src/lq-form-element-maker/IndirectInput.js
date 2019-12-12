
import { EventBus } from 'lq-form'
import Input from './DirectInput'

export default Input.extend({
    name: 'lq-v-text-field',
    data() {
        return {
            tagName: 'v-text-field',
            internalValue: null,
            isNeedToUpdateStore: true
        }
    },
    watch: {
        myInitializeValue: {
            handler(newValue, oldValue) {
                if (!newValue && !oldValue) {
                    return;
                } else if (this.isNotSame(newValue, oldValue)) {
                    this._whenStoreValueChange(newValue)
                }
            },
            deep: true
        }
    },
    methods: {
        /**
         * This method call after in created event
         * @use To assign the store value in element. and register some listner
         */
        __init() {

            if (this.value) {
                this._whenPropValueChange(this.value)
            } else if (this.LQElement) {
                this._whenStoreValueChange(this.LQElement)
            }
            /**
             * When Store Value update using the method $lqForm.setElementVal. 
             * @use for those components, which does not update after asign the store value direct into value props
             * so on this event we use $refs to update the component.
             * @indrectInput
             */
            EventBus.$on(`${this.lqForm.name}.${this.id}.update`, this.whenStoreValueUpdateDirectly)

            /**
             * @use Specially use in list filter form. Ex. If a list have filters in two place and some elements are common.
             *  So here, Each element is informing to each other.
             * @indrectInput
             */
            EventBus.$on(`${this.lqForm.name}.${this.id}.internalchange`, this.notifyGloballyToElement)

            /**
             * @use this Event handle case, IF in some case replacing values in store then $emit this event 
             * to inform the active component. 
             * @indrectInput
             */
            EventBus.$on(`lq-form-store-update-${this.name}`, this._whenUpdateFormData)

        },
        /**
         * A Collection of default props which are generally use in all compenents.
         */
        _defaultProps() {
            return {
                ...this.$attrs,
                disabled: this.isDisabled,
                errorMessages: this.elError,
                error: !!this.elError,
                value: this.internalValue,
                name: this.id,
                muliple: this.muliple
            }
        },
        /**
         * Update the internal Value.
         * @param {any} newValue Element value
         */
        _updateInternalValue(newValue) {
            const val = this._valueMask(newValue)
            if (this.$refs.lqel) {
                this.$refs.lqel.internalValue = val
            }
            this.internalValue = val;
        },
        /**
         * Get internal Value
         */
        _getInternalValue() {
            if (this.$refs.lqel && this.$refs.lqel.internalValue) {
                return this.$refs.lqel.internalValue;
            }
            return this.internalValue
        },
        /**
         * When value change internally.
         * @param {any} value 
         */
        onInput(value) {
            if (this.isNeedToUpdateStore && this.isNotSame(value, this.LQElement)) {
                this.setValue(value, true, true)
                EventBus.$emit(`${this.lqForm.name}.${this.id}.internalchange`, value)
            }
        },
        /**
         * To update the component value use the $ref in parent component.
         * @param {any} newValue 
         */
        setValueOutSide(newValue) {
            this.isNeedToUpdateStore = false;
            this.setValue(newValue, true, true)
            this._updateInternalValue(newValue)
            this.isNeedToUpdateStore = true;
        },
        /**
        * When value props change.
        * @param {*} newValue 
        */
        _whenPropValueChange(newValue) {
            this.setValue(newValue, true, false)
            this.internalValue = this._valueMask(this.LQElement)
        },

        /**
         * ALL Event listeners
         */
        _whenStoreValueChange(newValue) {
            this.isNeedToUpdateStore = false;
            this._updateInternalValue(newValue)
            this.isNeedToUpdateStore = true;
        },

        /**
         * When form element value update in store.
         * @param {any} newValue 
         * @indirectInput
         */
        whenStoreValueUpdateDirectly(newValue) {
            this._whenStoreValueChange(newValue)
        },

        /**
         * Self Notifications
         * @param {Any} newValue 
         */
        notifyGloballyToElement(newValue) {
            if (this.$refs.lqel) {
                if (this.isNotSame(this._valueMask(newValue), this._getInternalValue())) {
                    this.isNeedToUpdateStore = false;
                    this._updateInternalValue(newValue);
                    this.isNeedToUpdateStore = true;
                }
            }
        },

        /**
         * When Store value replaced.
         */
        _whenUpdateFormData() {
            this._whenStoreValueChange(this.LQElement)
        },
    },
    beforeDestroy() {

        /**
         * Remove All Listeners
         */
        EventBus.$off(`${this.lqForm.name}.${this.id}.update`, this.whenStoreValueUpdateDirectly)
        EventBus.$off(`${this.lqForm.name}.${this.id}.internalchange`, this.notifyGloballyToElement)
        EventBus.$off(`lq-form-store-update-${this.name}`, this._whenUpdateFormData)

        Input.options.beforeDestroy.call(this)
    }
})