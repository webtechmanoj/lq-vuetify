import TextField from './LqVTextField'
import axios from 'axios';

export default TextField.extend({
    name: 'lq-v-select',
    props: {
        options: Array,
        action: String,
        extraObjectKeys: Array,
        isOutputObject: {
            type: Boolean,
            default: () => false
        },
        fetchOnSearch: {
          type: Boolean,
          default: () => false
        },
        responseKey: {
          type: String,
          default: () => 'data.data'
        },
        searchKeyName: {
          type: String,
          default: () => 'search'
        },
        groupBy: String,
        uncategorisedLabel: {
          default: () => 'Uncategorised'
        },
        masterOf: Array,
    },
    data () {
        return {
            vuetifyTagName: 'v-select',
            response: [],
            requesting: false,
            dependencies: {},
            cancel: null
        }
    },
    computed: {
        items () {
          return this.action ? this.response : this.options
        },
        /**
         * Filter out the group name from given options
         */
        groups () {
          const options = this.items;
          let group_names = [];
          options.map((opt) => {
            let group_name = this.$helper.getProp(opt, this.groupBy);
            group_name = group_name ? group_name : this.uncategorisedLabel;
            if (group_names.indexOf(group_name) === -1) {
              group_names.push(group_name);
            }
          });
          return group_names;
        },
        finalItems () {
          return this.groupBy ? this.groupedOptions : this.items
        },
        /**
         * Make grouped options
         */
        groupedOptions () {
          const options = this.items;
          let grouped_options = {};
          options.map((opt) => {
            let group_name = this.$helper.getProp(opt, this.groupBy);
            group_name = group_name ? group_name : this.uncategorisedLabel;
            if (!grouped_options[group_name]) {
              grouped_options[group_name] = [];
            }
            grouped_options[group_name].push(opt);
          });
          let _options = [];
          const group_length = this.groups.length;
          this.groups.forEach((g, index) => {
              _options.push({header: g})
              console.log('grouped_options[g])', grouped_options[g])
              _options = _options.concat(grouped_options[g])
              if (index > 0 && index < group_length - 1) {
                _options.push({divider: true})
              }
          })
          console.log(_options, '_options')
          return _options;
        }
    },
    created () {
        this.$lqForm.addProp(this.lqForm.name, this.id, 'formatter', this.formatter)
        if (this.action) {
          this.fetchDataFromServer('');
        }
        this.$root.$on(`${this.lqForm.name}_${this.id}_change_dependency`, (id, value) => {
            this.setValue(this.$refs.lqel.multiple ? [] : null, true, false)
            this.dependencies[id] = value;
            if (this.action) {
              this.fetchDataFromServer('');
            }
        })
    },
    methods: {
        onChange (val) {
            this.internalChange = false
            this.$emit('change', val)
            // this.$root.$emit()
            if (!this.masterOf) return;

            this.masterOf.map((dependency) => {
                const isString = typeof dependency === 'string'
                const id = isString ? dependency : dependency.id
                const isValueArray = this.$helper.isArray(val)
                const myVal = !isValueArray ? [val] : val; 
                const values = myVal.map(selectedItem => this.$refs.lqel.getValue(selectedItem))
                
                this.$root.$emit(`${this.lqForm.name}_${id}_change_dependency`, this.id, isValueArray ? values : values[0])
            })
        },
        getProps () {
            return this.defaultSelectProps();
        },
        defaultSelectProps() {
            return {
                ...this._defaultProps(),
                returnObject: true,
                items: this.finalItems,
                loading: this.requesting
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
        fetchDataFromServer(search) {
          if (this.cancel) {
            this.requesting = false;
            this.cancel();
          }
          const CancelToken = axios.CancelToken;
          this.requesting = true;
          let data = {[this.searchKeyName]: search};
          if (this.dependencies && Object.keys(this.dependencies).length) {
            data = {...data, ...this.dependencies}
          }
          this.$axios(
            this.action + '?' + this.$helper.objectToQueryString(data), 
            {
              cancelToken: new CancelToken((c) =>  {
                this.cancel = c;
              })
            }
          ).then((response) => {
            this.requesting = false;
            this.cancel = null;
            let  items = this.$helper.getProp(response, this.responseKey, []);
            items = items ? items : [];
            const selectedItem = this.LQElement ? (!this.$helper.isArray(this.LQElement) ? [this.LQElement] : this.LQElement) : [];
            items = selectedItem.concat(items);
            this.response = items;
          }).catch(() => {
              this.requesting = false
              this.cancel = null;
          })
        }
    }
})