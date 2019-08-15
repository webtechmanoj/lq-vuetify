import TextField from './LqVTextField'
export default TextField.extend({
    name: 'lq-v-checkbox',
    data () {
        return {
            vuetifyTagName: 'v-checkbox'
        }
    },
    methods: {
        onInput() {},
        onChange (value) {
            if (this.isNotSame(value, this.LQElement)) {
                this.internalChange = true
                this.setValue(value, false, true)
            }
            this.$nextTick(function () {
                this.internalChange = false
            })
        },
        __init( ) {
            if (this.LQElement) {
                this._whenStoreValueChange(this.LQElement)
            }
            this.internalValue = this.value;
        },
        _whenPropValueChange (newValue) {
            this.internalValue = this.value;
        }
    }
})