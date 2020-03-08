import TextField from './LqVTextField'
import { format, parse } from 'date-fns';
import helper from 'vuejs-object-helper'

export default TextField.extend({
    name: 'lq-v-date-picker',
    props: {
        displayFormat: {
            type: String,
            default: 'dd/MM/yyyy',
        },
        separator: {
            type: String,
            default: '~',
        },
        textFieldProps: Object,
        showFooter: {
            type: Boolean,
            default: () => false
        },
        closeOnContentClick: {
            type: Boolean,
            default: () => true
        },
        persistent: {
            type: Boolean,
            default: () => true
        },
        range: {
            type: Boolean,
            default: () => false
        },
        container: {
            type: String,
            default: () => 'menu'
        }
    },
    data() {
        return {
            tagName: 'v-text-field',
            returnFormat: 'yyyy-MM-dd'
        }
    },
    computed: {
        dataFormatted: function () {
            if (this.internalValue && typeof this.internalValue === 'string') {
                return this.formatDate(this.internalValue)
            } else if (this.internalValue && helper.isArray(this.internalValue)) {
                return this.internalValue[0] && this.internalValue[1] ? `${this.formatDate(this.internalValue[0])} ${this.separator} ${this.formatDate(this.internalValue[1])}` : null
            } else {
                return null
            }
        }
    },
    render(createElement) {
        return createElement(this.container === 'menu' ? 'v-menu' : 'v-dialog', {
            props: this.container === 'menu' ? this.menuProps() : this.dialogProps(),
            ref: 'menuRef',
            scopedSlots: {
                activator: props => createElement('v-text-field', {
                    props: {
                        readonly: true,
                        disabled: this.isDisabled,
                        errorMessages: this.elError,
                        error: !!this.elError,
                        value: this.dataFormatted,
                        name: this.id,
                        ...this.textFieldProps
                    },
                    on: props.on
                }),
                default: this.defaultTemplate
            },
        })
    },
    methods: {
        defaultTemplate() {
            return this.$createElement(
                'v-date-picker',
                {
                    props: {
                        ...this.$attrs,
                        range: this.range,
                        value: this.range && !this.internalValue ? [null, null] : this.internalValue,
                    },
                    on: {
                        ...this.$listeners,
                        input: (value) => {
                            if (helper.isArray(value) && value[0] && value[1] && (new Date(value[0])).getTime() > (new Date(value[1])).getTime()) {
                                value = [value[1], value[0]]
                            }
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
        dialogProps() {
            return {
                persistent: this.persistent,
                width: '290px'
            }
        },
        menuProps() {
            return {
                closeOnContentClick: this.closeOnContentClick && !this.showFooter,
                transition: 'scale-transition',
                offsetY: true,
                maxWidth: '290px',
                minWidth: '290px'
            }
        },
        formatDate(date) {
            return format(parse(date, this.returnFormat, new Date()), this.displayFormat);
        },
        datePickerFooter() {
            return [
                this.$createElement('v-spacer'),
                this.cancelBtn(),
                this.okBtn(),
            ]
        },
        cancelBtn() {
            return this.$createElement('v-btn', {
                props: {
                    color: 'primary',
                    text: true
                },
                on: {
                    click: () => this.onCanclePicker(this.LQElement)
                }
            }, 'Cancel')
        },
        okBtn() {
            return this.$createElement('v-btn', {
                props: {
                    color: 'primary',
                    text: true
                },
                on: {
                    click: () => this.onSaveDatePicker(this.internalValue)
                }
            }, 'OK')
        },
        onCanclePicker(value) {
            this.internalValue = value
            this.onInput(value)
            this.dateMenu = false
            this.$refs.menuRef.save(value)
        },
        onSaveDatePicker(value) {
            this.internalValue = value
            this.onInput(value)
            this.dateMenu = false
            this.$refs.menuRef.save(value)
        }
    }
})