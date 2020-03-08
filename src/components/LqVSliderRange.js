import TextField from './LqVTextField'
export default TextField.extend({
    name: 'lq-v-range-slider',
    data() {
        return {
            tagName: 'v-range-slider'
        }
    },
    methods: {
        /**
       * To Make the collection of require props.
       */
        getProps() {
            return {
                ...TextField.options.methods.getProps.call(this),
                value: this.internalValue ? this.internalValue : [0, 0]
            }
        },
    }
})