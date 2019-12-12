import Vue from 'vue'
import { lqElementMixin, lqPermissionMixin } from 'lq-form'
import { isEqual } from 'lodash/core'

export default Vue.extend({
    name: 'lq-v-text-field',
    mixins: [lqElementMixin, lqPermissionMixin],
    props: {
        value: [Object, Array, Number, String],
        muliple: Boolean,
        customMask: Function,
        keepAlive: {
            default: () => true,
            type: Boolean
        }
    },
    data() {
        return {
            tagName: 'v-text-field',
        }
    },
    computed: {
        myInitializeValue() {
            return this.$helper.getProp(this.$store.state.form, `${this.lqForm.name}.initialize_values.${this.id}`, null);
        },
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                if (!newValue && !oldValue) {
                    return;
                } else if (this.isNotSame(newValue, oldValue)) {
                    this._whenPropValueChange(newValue)
                }
            },
            deep: true
        }
    },
    created() {
        this.__init();
    },
    render: function (createElement) {
        let self = this;
        if (!this.hasAccess) return null
        return createElement(
            this.tagName,
            {
                class: this.getClass(),
                on: {
                    ...self.$listeners,
                    input: function (value) {
                        
                            self.onInput(value)
                    },
                    focus: function () {
                        if (!self.touch) {
                            self.touchStatus(true);
                        }
                        self.$emit('focus', event)
                    },
                    blur: function (event) {
                        self.$emit('blur', event)
                        self.validateIfEventMatch('blur')
                    },
                    change: function (event) {
                        // self.isNeedToUpdateStore = true
                        self.onChange(event)
                    },
                    keypress: function (event) {
                        self.$emit('keypress', event)
                        self.validateIfEventMatch('keypress')
                    },
                    keyup: function (event) {
                        self.$emit('keyup', event)
                        self.validateIfEventMatch('keyup')
                    },
                    keydown: function (event) {
                        self.$emit('keydown', event)
                        self.validateIfEventMatch('keydown')
                    },
                    ...self.customEvents()
                },
                props: self.getProps(),
                domProps: self.getDomProps(),
                scopedSlots: self.$scopedSlots,
                attrs: this._defaultAttrs(),
                ref: 'lqel',
            },
            this.renderSlots(createElement, self.$slots)
        )
    },
    methods: {
        /**
         * This method call after in created event
         * @use To assign the store value in element. and register some listner
         */
        __init() {
            if (this.value) {
                this._whenPropValueChange(this.value)
            }
        },
        /**
         * To Compare the two values.
         * @param {any} newValue 
         * @param {any} oldValue 
         */
        isNotSame(newValue, oldValue) {
            return (
                (!newValue && oldValue) ||
                ((typeof newValue === 'string' || typeof newValue === 'number') && newValue !== oldValue) ||
                (typeof newValue === 'object' && !isEqual(newValue, oldValue))
            )
        },
        /**
        * Method to add events.
        */
        customEvents() {
            return {
                click: this.onClick
            }
        },
        /**
        * Method to add attributes which are mostly use in event component.
        */
        _defaultAttrs() {
            return {
                id: `${this.lqForm.name}.${this.id}`,
            }
        },
        /**
         * To Make the slots ready to render.
         * @param {Function} createElement 
         * @param {Object} slots 
         */
        _makeSlotReadyToRender(createElement, slots) {
            const slotNames = Object.keys(slots);
            return slotNames.map(
                slotName => createElement(
                    'template',
                    { slot: slotName },
                    slots[slotName]
                )
            )
        },
        /**
         * To Render slots.
         * @param {function} createElement 
         * @param {Object} slots 
         */
        renderSlots(createElement, slots) {
            return this._makeSlotReadyToRender(createElement, slots);
        },
        /**
         * To check the validation call event.
         * @param {String} eventName Event name like click, blur
         */
        validateIfEventMatch(eventName) {
            if (this.validateOnEvent === eventName) {
                this.validate();
            }
        },
        /**
         * When click on element.
         * @param {Object} event 
         */
        onClick(event) {
            if (!this.touch) {
                this.touchStatus(true);
            }
            this.$emit('click', event)
            this.validateIfEventMatch('click')
        },
        /**
         * To Make the collection of require props.
         */
        getProps() {
            return this._defaultProps();
        },
        /**
         * To make the collection of require dom props.
         */
        getDomProps() {
            return this._defaultDomProps();
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
                value: this._valueMask(this.LQElement),
                name: this.id,
                muliple: this.muliple
            }
        },
        /**
         * A Collection of default dom props which are generally use in all compenents.
         */
        _defaultDomProps() {
            return {}
        },
        /**
        * To Mark the internal value. only to display.
        * @param {any} newValue Element value
        */
        _valueMask(newValue) {
            return this.customMask ? this.customMask(newValue) : newValue
        },
        /**
        * When value props change.
        * @param {*} newValue 
        */
        _whenPropValueChange(newValue) {
            this.setValue(newValue, true, false)
        },
        /**
         * When value change internally.
         * @param {any} value 
         */
        onInput(value) {
            if (this.isNotSame(value, this.LQElement)) {
                this.setValue(value, true, true)
            }
        },
        /**
         * When value change internally.
         * @param {any} event 
         */
        onChange(event) {
            this.$emit('change', event)
        },
        getClass() {
            return {}
        },

    },
    beforeDestroy() {
        /**
         * Delete the value in store when element destroy, If Keep Alive is false
         */
        if (!this.keepAlive) {
            const newVal = this.$refs.lqel.multiple ? [] : null;
            this.setValue(newVal, true, false)
        }
    }
})