import DatePicker from './LqVDatePicker'

export default DatePicker.extend({
    name: 'lq-v-color-picker',
    props: {
        closeOnContentClick: {
            type: Boolean,
            default: () => false
        },
        showFooter: {
            type: Boolean,
            default: () => true
        },
    },
    computed: {
        dataFormatted: function () {
            return this.internalValue && typeof this.internalValue === 'object' ? this.internalValue.hex : this.internalValue
        }
    },
    methods: {
        defaultTemplate() {
            return [
                this.$createElement(
                    'v-color-picker',
                    {
                        props: {
                            ...this.$attrs,
                            value: this.internalValue,
                            flat: this.showFooter
                        },
                        on: {
                            ...this.$listeners,
                            input: (value) => {

                                this.internalValue = value
                                if (!this.showFooter) {
                                    this.onInput(value)
                                }
                            },
                        },
                    },
                ),
                this.showFooter ? this.$createElement('v-row', { props: { align: 'right' } }, this.datePickerFooter()) : null
            ]
        },
    }
})