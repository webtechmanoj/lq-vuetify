import DatePicker from './LqVDatePicker'

export default DatePicker.extend({
    name: 'lq-v-time-picker',
    props: {
        displayFormat: {
            type: String,
            default: function () {
                return this.$options.propsData.useSeconds ? 'hh:mm:ss a' : 'hh:mm a'
            },
        },
        useSeconds: {
            type: Boolean,
            default: () => false
        }

    },
    computed: {
        dataFormatted: function () {
            return this.internalValue ? this.formatDate(this.internalValue) : null
        }
    },
    data: (vm) => {
        return {
            returnFormat: vm.useSeconds ? 'HH:mm:ss' : 'HH:mm'
        }
    },
    methods: {
        defaultTemplate() {
            return this.$createElement(
                'v-time-picker',
                {
                    props: {
                        ...this.$attrs,
                        useSeconds: this.useSeconds,
                        value: this.internalValue,
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
                    scopedSlots: {
                        default: () => this.showFooter ? this.datePickerFooter() : null
                    }
                },
            )
        },
    }
})