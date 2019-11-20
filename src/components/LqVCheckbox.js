import TextField from './LqVTextField'
export default TextField.extend({
    name: 'lq-v-checkbox',
    data() {
        return {
            vuetifyTagName: 'v-checkbox'
        }
    },
    methods: {
        onInput() {
        },
        customEvents() {
            return {}
        },
        onChange(value) {
            if (this.isNotSame(value, this.LQElement)) {
                if (!this.touch) {
                    this.touchStatus(true);
                }
                this.setValue(value, true, true)
                this.$emit('change', value)
            }
        },
        __init() {
            if (this.LQElement) {
                this._whenStoreValueChange(this.LQElement)
            }
            this.internalValue = this.value;
        },
        _whenPropValueChange() {
            this.internalValue = this.value;
            this.$refs.lqel.onChange()
        },
        getProps() {
            return {
                ...this._defaultProps(),
                inputValue: this.LQElement,
            }
        }
    }
})