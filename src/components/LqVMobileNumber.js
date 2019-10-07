import TextField from './LqVTextField';
let calling_codes = [];

export default TextField.extend({
    name: 'lq-v-mobile-number',
    props: {
        action: {
            type: String,
            default: () => '/calling-code'
        },
        responseKey: {
            type: String,
            default: () => 'data.data'
        },
        itemText: {
            type: String,
            default: () => 'code'
        },
        itemValue: {
            type: String,
            default: () => 'code'
        },
        defaultCodeKey: {
            type: String,
            default: () => 'data.selected.code'
        },
        filter: Function
    },
    data() {
        return {
            loading: false,
            calling_code_list: calling_codes,
            codeInternalValue: null
        }
    },
    created() {
        if (calling_codes.length === 0) {
            this._fetchCallingCode()
        }
    },
    methods: {
        getClass() {
            return {
                country_drop: true
            }
        },
        getProps() {
            return {
                ...this._defaultProps(),
                loading: this.loading,
                mask: '#############',
            }
        },
        _whenStoreValueChange(newValue) {
            const mobile_number = this._getOnlyMobileNumber(newValue)
            const code = this._getOnlyCallingCode(newValue)
            if (this.$refs.lqel) {
                this.$refs.lqel.internalValue = this._getOnlyMobileNumber(newValue)
            } else {
                this.internalValue = mobile_number
            }
            if (this.$refs.cCodeEl) {
                this.$refs.cCodeEl.internalValue = code
            } else {
                this.codeInternalValue = code
            }

        },
        _whenPropValueChange(newValue) {
            this.setValue(newValue, true, false)
            this.internalValue = this._getOnlyMobileNumber(this.LQElement)
            this.codeInternalValue = this._getOnlyCallingCode(this.LQElement)
        },
        /**
         * separate the mobile number and calling code
         */
        _separateInput(input) {
            if (!input) return [];
            let slashIndex = input.indexOf('-');
            if (slashIndex === -1) return [null, input];
            return [
                input.substr(0, slashIndex),
                input.substr(slashIndex + 1, input.length)
            ];
        },
        _getOnlyMobileNumber(input) {
            const _input_arr = this._separateInput(input);
            return typeof _input_arr[1] !== 'undefined' ? _input_arr[1] : null
        },
        _getOnlyCallingCode(input) {
            const _input_arr = this._separateInput(input);
            return typeof _input_arr[0] !== 'undefined' ? _input_arr[0] : null
        },
        onInput(value) {
            const mobile_number = this._getOnlyMobileNumber(this.LQElement);
            const calling_code = this._getOnlyCallingCode(this.LQElement);
            if (this.isNotSame(value, mobile_number)) {
                this.setValue(this._joinMobileCallingCode(calling_code, value), true, true)
            }
        },
        _joinMobileCallingCode(code, mb) {
            if (!code && !mb) {
                return null;
            } else if (code && !mb) {
                return code + '-';
            } else if (mb && !code) {
                return mb;
            } else {
                return code + '-' + mb
            }
        },
        renderSlots(createElement, slots) {
            let data = this._makeSlotReadyToRender(createElement, slots);
            data.push(this._getCallingCode())
            return data;
        },
        _getCallingCodeScopedSlot() {
            let slots = {};
            if (this.$scopedSlots.selection) {
                slots.selection = this.$scopedSlots.selection;
            }
            if (this.$scopedSlots.item) {
                slots.item = this.$scopedSlots.item;
            }
            return slots;
        },
        _getCallingCode() {
            let self = this;
            return this.$createElement(
                'v-autocomplete',
                {
                    class: {
                        calling_option: true
                    },
                    on: {
                        input: function (value) {
                            const mobile_number = self._getOnlyMobileNumber(self.LQElement);
                            const calling_code = self._getOnlyCallingCode(self.LQElement);
                            if (self.isNotSame(value, calling_code)) {
                                self.setValue(self._joinMobileCallingCode(value, mobile_number), true, true)
                            }
                        },
                        click: function (event) {
                            event.stopPropagation()
                            self.$refs.cCodeEl.focus()
                        }
                    },
                    scopedSlots: self._getCallingCodeScopedSlot(),
                    slot: 'prepend-inner',
                    props: {
                        itemValue: self.itemValue,
                        itemText: self.itemText,
                        items: self.calling_code_list,
                        value: self.codeInternalValue,
                        solo: true,
                        height: 26,
                        singleLine: true,
                        filter: self.filter,
                        menuProp: 'auto',
                        hideDetails: true,
                        disabled: self.disabled
                    },
                    ref: 'cCodeEl',
                }
            )
        },
        _fetchCallingCode() {
            this.loading = true
            this.axios(this.action).then((response) => {
                this.loading = false
                calling_codes = this.calling_code_list = this.$helper.getProp(response, this.responseKey, []);
                const calling_code = this._getOnlyCallingCode(this.LQElement);
                const mobile_number = this._getOnlyMobileNumber(this.LQElement);
                if (!calling_code && this.defaultCodeKey) {
                    const default_code = this.$helper.getProp(response, this.defaultCodeKey);
                    this.codeInternalValue = default_code;
                    this.setValue(
                        this._joinMobileCallingCode(default_code, mobile_number),
                        false,
                        false
                    )
                }
            }).catch(() => { this.loading = false })
        }
    }
})