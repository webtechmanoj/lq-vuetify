import Select from './LqVSelect'
export default Select.extend({
    name: 'lq-v-autocomplete',
    data () {
        return {
            vuetifyTagName: 'v-autocomplete',
            search: ''
        }
    },
    methods: {
    	customEvents() {
    		return {
	    		'update:searchInput': (search) => {
	    			if (this.fetchOnSearch && this.action && search && search !== this.search) {
			        	this.fetchDataFromServer(search);
			        }
			        this.search = search
	    		}
	    	}
    	}
    }
})