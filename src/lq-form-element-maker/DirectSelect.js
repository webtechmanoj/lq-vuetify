import DirectInput from './DirectInput'
import SelectMixin from './SelectMixin'

export default DirectInput.extend({
    name: 'direct-select',
    mixins: [SelectMixin]
})