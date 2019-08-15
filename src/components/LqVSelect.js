import TextField from './LqVTextField'
export default TextField.extend({
    name: 'lq-v-select',
    props: {
        options: Array,
        action: String,
        extraObjectKeys: Array,
        isOutputObject: {
            type: Boolean,
            default: () => false
        }
        
    },
    data () {
        return {
            vuetifyTagName: 'v-select'
        }
    },
    computed: {
        items () {
            return this.options
        }
    },
    created () {
        this.$lqForm.addProp(this.lqForm.name, this.id, 'formatter', this.formatter)
    },
    methods: {
        getProps () {
            return {
                ...this._defaultProps(),
                returnObject: true,
                items: this.items
            }
        },
        formatter () {
            const output = this.$refs.lqel.selectedItems.map(selectedItem => {
              if (this.isOutputObject) {
                if (typeof selectedItem === 'string') {
                  return {
                    [this.$refs.lqel.itemText]: selectedItem,
                    new: true
                  }
                }
                const item = {}
                const extraObjectKeys = this.extraObjectKeys ? Object.assign([], this.extraObjectKeys) : []
                extraObjectKeys.push(this.$refs.lqel.itemText)
                extraObjectKeys.push(this.$refs.lqel.itemValue)
      
                extraObjectKeys.forEach(extrakey => {
                  const val = selectedItem[extrakey]
                  if (val) {
                    item[extrakey] = val
                  }
                })
                return item
              } else {
                return this.$refs.lqel.getValue(selectedItem)
              }
            })
            return output ? (this.$refs.lqel.multiple ? output : output[0]) : null
        },
    }
})