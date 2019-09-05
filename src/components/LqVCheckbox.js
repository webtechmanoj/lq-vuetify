import TextField from './LqVTextField'
export default TextField.extend({
    name: 'lq-v-checkbox',
    data () {
        return {
            vuetifyTagName: 'v-checkbox'
        }
    },
    methods: {
        onInput() {
            // console.log('I am sjdsk', this.id, v)
        },
        onChange (value) {
            if (this.isNotSame(value, this.LQElement)) {
                this.setValue(value, false, true)
            }
        },
        __init( ) {
            if (this.LQElement) {
                this._whenStoreValueChange(this.LQElement)
            }
            this.internalValue = this.value;
        },
        _whenPropValueChange () {
            this.internalValue = this.value;
        }
    }
})