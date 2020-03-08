import Vue from 'vue'
import { lqFormMixin } from 'lq-form'

export default Vue.extend({
    name: 'lq-v-form',
    inheritAttrs: false,
    mixins: [lqFormMixin],
    props: {
        tag: {
            type: String,
            default: () => 'form'
        },
        staticData: Object
    },
    render(createElement) {
        return createElement(this.tag, {
            on: {
                submit: e => { e.preventDefault(); this.submit(this.staticData) },
                ...this.$listeners
            },
            // domProps: this.$attrs,
            staticClass: 'v-form lq-v-form',
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
            props: {
                tag: this.props,
                ...this.$attrs
            }
        }, this.$scopedSlots.default ? this.$scopedSlots.default({
            model: this.formValues,
            errors: this.formErrors,
            push: this.push,
            canShow: this.canShow,
            unshift: this.unshift,
            remove: this.remove,
            removeError: this.removeError,
        }) : null)
    }
})