// import * as components from './components'
import LqVTextField from './components/LqVTextField'
import LqVForm from './components/LqVForm'
import LqVSelect from './components/LqVSelect'
import LqVTextarea from './components/LqVTextarea'
import LqVRating from './components/LqVRating'
import LqVAutocomplete from './components/LqVAutocomplete'
import LqVCombobox from './components/LqVCombobox'
import LqVCheckbox from './components/LqVCheckbox'
import LqVRadioGroup from './components/LqVRadioGroup'
import LqVSwitch from './components/LqVSwitch'
import LqVMobileNumber from './components/LqVMobileNumber'
import LqVDateRange from './components/LqVDateRange'

export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install (Vue, options) {
    Vue.component('lq-v-text-field', LqVTextField)
    Vue.component('lq-v-form', LqVForm)
    Vue.component('lq-v-select', LqVSelect)
    Vue.component('lq-v-textarea', LqVTextarea)
    Vue.component('lq-v-rating', LqVRating)
    Vue.component('lq-v-autocomplete', LqVAutocomplete)
    Vue.component('lq-v-combobox', LqVCombobox)
    Vue.component('lq-v-checkbox', LqVCheckbox)
    Vue.component('lq-v-radio-group', LqVRadioGroup)
    Vue.component('lq-v-switch', LqVSwitch)
    Vue.component('lq-v-mobile-number', LqVMobileNumber)
    Vue.component('lq-v-date-range', LqVDateRange)
    // console.log('I am here to go', components.LqVAutocomplete)
    // if (components) {
    //   for (const key in components) {
    //     console.log('key', key)
    //     const component = components[key]
    //     // console.log('component', component)
    //     Vue.component(key, component)
    //   }
    // }
  }
}