import Checkbox from './LqVCheckbox'
import { EventBus } from 'lq-form'
export default Checkbox.extend({
    name: 'lq-v-radio',
    data() {
        return {
            tagName: 'v-radio'
        }
    },
    methods: {
        __init() {
            Checkbox.options.methods.__init.call(this)
            EventBus.$on(`${this.lqForm.name}.${this.id}.update`, this.whenStoreValueUpdateDirectly)
        },
    }
})