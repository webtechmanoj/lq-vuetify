import TextField from './LqVTextField'
import VDateRange from './DateRangePicker/VDateRange'
export default TextField.extend({
    name: 'lq-v-date-range',
    components: { VDateRange },
    data () {
        return {
            vuetifyTagName: 'v-date-range',
            internalValue: undefined,
        }
    },
    methods: {
        _defaultProps () {
            return {
                ...this.$attrs,
                disabled: this.disabled,
                errorMessages: this.elError,
                error: !!this.elError,
                value: this.LQElement ? this.LQElement: undefined,
                id: `${this.lqForm.name}.${this.id}`,
                name: this.id,
            }
        }
    }
})