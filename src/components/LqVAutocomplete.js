import Select from './LqVSelect'
export default Select.extend({
    name: 'lq-v-autocomplete',
    data () {
        return {
            vuetifyTagName: 'v-autocomplete'
        }
    },
    methods: {
    	customEvents() {
    		return {
	    		'update:searchInput': (search) => {
	    			// console.log('searchg', search)
	    			if (this.fetchOnSearch && this.action && search) {
			          this.fetchDataFromServer(search);
			        }
	    		}
	    	}
    	}
    }
})