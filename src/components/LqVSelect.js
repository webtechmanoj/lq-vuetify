import TextField from './LqVTextField'
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep'
import { isEqual } from 'lodash/core'

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
        staticData: Object,
        fetchOnSearch: {
            type: Boolean,
            default: () => false
        },
        fetchOnLoad: {
            type: Boolean,
            default: () => true
        },
        responseKey: {
            type: String,
            default: () => 'data.data'
        },
        searchKeyName: {
            type: String,
            default: () => 'search'
        },
        itemText: {
            type: String,
            default: () => 'name'
        },
        itemValue: {
            type: String,
            default: () => 'id'
        },
        multiple: {
            type: Boolean,
            default: () => false
        },
        groupBy: String,
        uncategorisedLabel: {
            default: () => 'Uncategorised'
        },
        masterOf: Array,
    },
    data() {
        return {
            vuetifyTagName: 'v-select',
            response: [],
            requesting: false,
            dependencies: {},
            cancel: null
        }
    },
    computed: {
        items() {
            return this.action ? this.response : this.options
        },
        /**
         * Filter out the group name from given options
         */
        groups() {
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
        finalItems() {
            return this.groupBy ? this.groupedOptions : this.items
        },
        /**
         * Make grouped options
         */
        groupedOptions() {
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
                _options.push({ header: g })
                _options = _options.concat(grouped_options[g])
                if (index > 0 && index < group_length - 1) {
                    _options.push({ divider: true })
                }
            })
            return _options;
        }
    },
    created() {
        this.$lqForm.addProp(this.lqForm.name, this.id, 'formatter', this.formatter)
        if (this.action && this.fetchOnLoad) {
            this.fetchDataFromServer('');
        }
        this.$root.$on(`${this.lqForm.name}_${this.id}_change_dependency`, this.masterChange)
    },
    beforeDestroy() {
        this.$root.$off(`${this.lqForm.name}_${this.id}_change_dependency`, this.masterChange);
    },
    methods: {
        onChange(val) {
            this.$emit('change', val)
            this.broadCastToChild(val);
        },
        getProps() {
            return this.defaultSelectProps();
        },
        defaultSelectProps() {
            return {
                ...this._defaultProps(),
                returnObject: true,
                items: this.finalItems,
                loading: this.requesting,
                itemText: this.itemText,
                itemValue: this.itemValue,
                multiple: this.multiple
            }
        },
        broadCastToChild(val, outside = false) {
            if (!this.masterOf) return;
            this.masterOf.map((dependency) => {
                const isString = typeof dependency === 'string'
                const id = isString ? dependency : dependency.id
                const isValueArray = this.$helper.isArray(val)
                const myVal = !isValueArray ? [val] : val;
                const values = myVal.map(selectedItem => this.getItemValue(selectedItem))
                this.$root.$emit(
                    `${this.lqForm.name}_${id}_change_dependency`,
                    this.id,
                    isValueArray ? values : values[0],
                    outside
                )
            })
        },
        formatter() {

            if (!this.LQElement) { return null }

            let items = typeof this.LQElement === 'object' ? cloneDeep(this.LQElement) : this.LQElement;

            items = this.$helper.isArray(items) ? items : [items];
            const output = items.map(selectedItem => {
                if (this.isOutputObject) {
                    if (typeof selectedItem === 'string') {
                        return {
                            [this.itemText]: selectedItem,
                            new: true
                        }
                    }
                    const item = {}
                    const extraObjectKeys = this.extraObjectKeys ? Object.assign([], this.extraObjectKeys) : []
                    extraObjectKeys.push(this.itemText)
                    extraObjectKeys.push(this.itemValue)

                    extraObjectKeys.forEach(extrakey => {
                        const val = selectedItem[extrakey]
                        if (val) {
                            item[extrakey] = val
                        }
                    })
                    return item
                } else {
                    return this.getItemValue(selectedItem);
                }
            })
            return output ? (this.multiple ? output : output[0]) : null
        },
        _whenStoreValueChange(newValue) {
            this.isNeedToUpdateStore = false;
            const val = this.customMask ? this.customMask(newValue) : newValue
            if (this.$refs.lqel) {
                this.$refs.lqel.internalValue = val
            } else {
                this.internalValue = val;
            }
            this.broadCastToChild(newValue, true)
            const selectedItem = newValue ? (!this.$helper.isArray(newValue) ? [newValue] : newValue) : [];
            this.response = this.response.concat(selectedItem);
            this.isNeedToUpdateStore = true;
        },
        setValueOutSide(newValue) {
            TextField.options.methods.setValueOutSide(this, newValue);
            this.broadCastToChild(newValue, true)
        },
        getItemValue(selectedItem) {
            return typeof selectedItem !== 'object' ? selectedItem : (selectedItem[this.itemValue] ? selectedItem[this.itemValue] : '')
        },
        fetchDataFromServer(search) {
            if (this.cancel) {
                this.requesting = false;
                this.cancel();
            }
            const CancelToken = axios.CancelToken;
            this.requesting = true;
            let data = { [this.searchKeyName]: search };
            if (this.dependencies && Object.keys(this.dependencies).length) {
                data = { ...data, ...this.dependencies }
            }
            if (this.staticData) {
                data = { ...data, ...this.staticData }
            }
            this.$axios(
                this.action + '?' + this.$helper.objectToQueryString(data),
                {
                    cancelToken: new CancelToken((c) => {
                        this.cancel = c;
                    })
                }
            ).then((response) => {
                this.requesting = false;
                this.cancel = null;
                let items = this.$helper.getProp(response, this.responseKey, []);
                items = items ? items : [];
                const selectedItem = this.LQElement ? (!this.$helper.isArray(this.LQElement) ? [this.LQElement] : this.LQElement) : [];
                items = selectedItem.concat(items);
                this.response = items;
            }).catch(() => {
                this.requesting = false
                this.cancel = null;
            })
        },
        masterChange(id, value, outside) {
            if (!outside) {
                this.setValue(this.$refs.lqel.multiple ? [] : null, true, false)
            }
            this.dependencies[id] = value;
            if (this.action) {
                this.fetchDataFromServer('');
            }
        }
    },
    watch: {
        staticData: {
            handler(newStaticData, oldStaticData) {
                if (!isEqual(newStaticData, oldStaticData)) {
                    this.fetchDataFromServer('');
                }
            },
            deep: true
        }
    }
})