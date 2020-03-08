
/**
 * Form Input Fields
 */
import LqVTextField from './components/LqVTextField'
import LqVForm from './components/LqVForm'
import LqVSelect from './components/LqVSelect'
import LqVTextarea from './components/LqVTextarea'
import LqVRating from './components/LqVRating'
import LqVAutocomplete from './components/LqVAutocomplete'
import LqVCombobox from './components/LqVCombobox'
import LqVCheckbox from './components/LqVCheckbox'
import LqVRadioGroup from './components/LqVRadioGroup'
import LqVRadio from './components/LqVRadio'
import LqVSwitch from './components/LqVSwitch'
import LqVMobileNumber from './components/LqVMobileNumber'
import LqVDatePicker from './components/LqVDatePicker'
import LqVTimePicker from './components/LqVTimePicker'
import LqVColorPicker from './components/LqVColorPicker'
import LqVFile from './components/LqVFile'
import LqVSlider from './components/LqVSlider'
import LqVRangeSlider from './components/LqVSliderRange'

/**
 * Datatable Components
 */

import LqVDataTable from './components/LqVDataTable';
import LqVPagination from './components/LqVDataTable/LqVPagination';
import LqVDataTableSelect from './components/LqVDataTable/LqVDataTableSelect';
import LqVDataTableSelectAll from './components/LqVDataTable/LqVDataTableSelectAll';
import LqVDataTableHeader from './components/LqVDataTable/LqVDataTableHeader';


import { lqTableOptions } from './defaultOptions'

export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue, options = {}) {
    lqTableOptions.merge(options)
    Vue.component('lq-v-text-field', LqVTextField)
    Vue.component('lq-v-form', LqVForm)
    Vue.component('lq-v-select', LqVSelect)
    Vue.component('lq-v-textarea', LqVTextarea)
    Vue.component('lq-v-rating', LqVRating)
    Vue.component('lq-v-autocomplete', LqVAutocomplete)
    Vue.component('lq-v-combobox', LqVCombobox)
    Vue.component('lq-v-checkbox', LqVCheckbox)
    Vue.component('lq-v-radio-group', LqVRadioGroup)
    Vue.component('lq-v-radio', LqVRadio)
    Vue.component('lq-v-switch', LqVSwitch)
    Vue.component('lq-v-mobile-number', LqVMobileNumber)
    Vue.component('lq-v-date-picker', LqVDatePicker)
    Vue.component('lq-v-time-picker', LqVTimePicker)
    Vue.component('lq-v-color-picker', LqVColorPicker)
    Vue.component('lq-v-file-input', LqVFile)
    Vue.component('lq-v-slider', LqVSlider)
    Vue.component('lq-v-range-slider', LqVRangeSlider)

    Vue.component('lq-v-data-table', LqVDataTable)
    Vue.component('lq-v-pagination', LqVPagination)
    Vue.component('lq-v-data-table-select', LqVDataTableSelect)
    Vue.component('lq-v-data-table-select-all', LqVDataTableSelectAll)
    Vue.component('lq-v-data-table-header', LqVDataTableHeader)
  }
}