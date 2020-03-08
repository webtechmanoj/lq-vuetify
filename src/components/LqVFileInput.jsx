import Input from './LqVTextField'
import helper from 'vuejs-object-helper'
// import { lqFileMixin } from 'lq-form'
export default Input.extend({
    name: 'lq-v-file-input',
    // mixins: [lqFileMixin],
    props: {
        multiple: {
            type: Boolean,
            default: () => { return false; }
        },
        value: [File, Array],
    },
    data() {
        return {
            tagName: 'v-file-input'
        }
    },
    methods: {
        getProps() {
            // console.log('this.multiple', this.multiple)
            return {
                ...Input.options.methods.getProps.call(this),
                value: this.LQElement instanceof File || this.LQElement instanceof FileList ? this.LQElement : null,
                multiple: this.multiple,
                accept: helper.getProp(this.lqElRules, 'file.acceptedFiles', []).join(', ')
            }
        },
        _defaultAttrs() {
            return {
                ...Input.options.methods._defaultAttrs.call(this),
                multiple: this.multiple,
                ...this.$attrs
            }
        },
        /**
         * When value change internally.
         * @param {any} value 
         */
        onInput() {

        },
        onChange(value) {
            if (!(value === null && typeof this.LQElement === 'string')) {
                Input.options.methods.onInput.call(this, value)
            }
            this.$emit('change', event)
        },
    }

})

//multiple