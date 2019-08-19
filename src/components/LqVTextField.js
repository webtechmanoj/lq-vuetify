import Vue from 'vue'
import { lqElementMixin } from 'lq-form'
import { isEqual } from 'lodash/core'

export default Vue.extend({
    name: 'lq-v-text-field',
    mixins: [ lqElementMixin ],
    props: {
        value: [Object, Array, Number, String],
        muliple: Boolean,
        customMask: Function
    },
    data () {
        return {
            vuetifyTagName: 'v-text-field',
            internalChange: false,
            internalValue: null,
            isNeedToUpdateStore: true
        }
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                if (!newValue) {
                    return;
                } else if ( 
                    ((typeof newValue === 'string' || typeof newValue === 'number') && newValue !== oldValue) || 
                    (typeof newValue === 'object' && !isEqual(newValue, oldValue))
                
                ) {
                    this.internalChange = true
                    this._whenPropValueChange(newValue)
                }
            },
            deep: true
        },
        LQElement (newValue, oldValue) {
            // console.log('I am LQElement Watch', newValue, oldValue, this.internalChange, this.id)
            if (!newValue && !oldValue) {
                return;
            }else if (this.internalChange) {
                return;
            } else if (this.isNotSame(newValue, oldValue)) {
                // console.log('I am LQElement Watch, My Value not same from prev.', newValue, this.id)
                this._whenStoreValueChange(newValue)
            }
        }
    },
    created() {
        this.__init();
    },
    render: function (createElement) {
        let self = this;
        // console.log('self.getProps()', this.id, self.customMask)
        return createElement(
            this.vuetifyTagName, 
            {
                class: this.getClass(),
                on: {
                    ...self.$listeners,
                    input: function (value) {                         
                        if (self.isNeedToUpdateStore) {
                            self.onInput(value)
                        }
                    },
                    focus: function () {
                        if (!self.touch) {
                            self.touchStatus(true);
                        }
                        self.$emit('focus', event)
                    },
                    blur: function(event) {
                        self.internalChange = false
                        self.$emit('blur', event)
                        self.validateIfEventMatch('blur')
                    },
                    change: function(event) {
                        // self.isNeedToUpdateStore = true
                        self.onChange(event)
                    },
                    keypress: function(event) {
                        self.$emit('keypress', event)
                        self.validateIfEventMatch('keypress')
                    },
                    keyup: function(event) {
                        self.internalChange = false
                        self.$emit('keyup', event)
                        self.validateIfEventMatch('keyup')
                    },
                    keydown: function(event) {
                        self.$emit('keydown', event)
                        self.validateIfEventMatch('keydown')
                    },
                    click: function(event) {
                        // console.log('I am Click')
                        if (!self.touch) {
                            self.touchStatus(true);
                        }
                        self.$emit('click', event)
                        self.validateIfEventMatch('click')
                    },
                    ...self.customEvents()
                },
                props: self.getProps(),
                domProps: self.getDomProps(),
                scopedSlots: self.$scopedSlots,
                ref: 'lqel',
            },
            this.renderSlots(createElement, self.$slots)
        )
    },
    methods: {
        __init( ) {
            if (this.value) {
                this._whenPropValueChange(this.value)
            } else if (this.LQElement) {
                this._whenStoreValueChange(this.LQElement)
            }
        },
        isNotSame(newValue, oldValue) {
            // console.log('Is NOt Same', typeof newValue , this.id, newValue, oldValue)
            return (
                (!newValue && oldValue) ||
                ((typeof newValue === 'string' || typeof newValue === 'number') && newValue !== oldValue) || 
                (typeof newValue === 'object' && !isEqual(newValue, oldValue))
            )
        },
        customEvents() {
            return {}
        },
        _makeSlotReadyToRender (createElement, slots) {
            const slotNames = Object.keys(slots);
            return slotNames.map(
                slotName => createElement(
                    'template', 
                    { slot: slotName }, 
                    slots[slotName]
                )
            )
        },
        renderSlots (createElement, slots) {
            return this._makeSlotReadyToRender(createElement, slots);
        },
        validateIfEventMatch (eventName) {
            if (this.validateOnEvent === eventName) {
                this.validate();
            }
        },
        getProps () {
            return this._defaultProps();
        },
        getDomProps () {
            return this._defaultDomProps();
        },
        _defaultProps () {
            return {
                ...this.$attrs,
                disabled: this.disabled,
                errorMessages: this.elError,
                error: !!this.elError,
                value: this.internalValue,
                id: `${this.lqForm.name}.${this.id}`,
                name: this.id,
                muliple: this.muliple
            }
        },
        _defaultDomProps () {
            return {
                
            }
        },
        _whenStoreValueChange (newValue) {
            // if (this.)
            this.isNeedToUpdateStore = false;
            const val = this.customMask ? this.customMask(newValue) : newValue
            if (this.$refs.lqel) {
                this.$refs.lqel.internalValue = val
            }
            this.isNeedToUpdateStore = true;
        },
        _whenPropValueChange (newValue) {
            this.setValue(newValue, true, false)
            this.internalValue = this.LQElement
        },
        onInput (value) {
            if (this.isNotSame(value, this.LQElement)) {
                this.internalChange = true
                this.setValue(value, true, true)
            }
            this.$nextTick(function () {
                this.internalChange = false
            })
        },
        onChange (event) {
            this.internalChange = false
            this.$emit('change', event)
        },
        getClass() {
            return {}
        }
    }
})