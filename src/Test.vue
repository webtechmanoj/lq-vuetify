<template>
 <v-container
      fluid
      grid-list-xl
    >
      <v-layout
        align-center
        wrap
      >

      {{fromData}}
      <lq2-v-form name="test_form" :rules="rules" ref="lqForm" action="http://localhost:8081" content-type="formdata">
        <template v-slot:default="{model}">
            {{model}}
            <v-flex md12>
              <!-- Lq2VMobileNumber -->
              <lq2-v-mobile-number id="my_mobile_number" :filter="searchCode">
                <template v-slot:item="{item}">
                  <template v-if="typeof item !== 'object'">
                    <v-list-tile-content v-text="item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :with="5" :src="item.flag">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        ({{item.code}}) {{item.name}} 
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
                <!-- <template v-slot:selection="{item}">
                    <v-avatar left>
                      <v-img :with="5" :src="item.flag"></v-img>
                    </v-avatar>
                     ({{item.code}}) {{item.name}}
                </template> -->
              </lq2-v-mobile-number>
            </v-flex>
        <v-flex xs12 sm12>
          <lq2-v-text-field
            id="name"
            label="Name"
            value="I am here to Test value"
            hint="Type a Email only"
            :persistent-hint="true"
            autofocus
            :clearable="true"
            append-outer-icon="place"
            @click:append-outer="sendMessage"
            >
            <template v-slot:prepend>
              <select name="jhdkj">
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
              </select>
            </template>
          </lq2-v-text-field>
        </v-flex>
        <v-flex xs12 sm12>
          <lq2-v-textarea id="textarea" :rows="2" auto-grow />
        </v-flex>
        <v-flex xs12 sm12>
          mobile_no
          <lq2-v-select id="mobile_no"
            :options="items2"
            :value="1"
            label="Mobile Number"
            :is-output-object="false"
            validate-on-event="blur"
            @change="SelectChange"
            placeholder="Type Mobile Number jhere.."
            item-value="id"
            item-text="login"
            clearable
          >
          </lq2-v-select>
        </v-flex>
         <v-flex xs12 sm12 md12>
          <lq2-v-combobox
            id="combobox"
            :loading="loading"
            :options="items2"
            :search-input.sync="search"
            hide-selected
            hint="Maximum of 5 tags"
            label="Add some tags"
            multiple
            item-value="id"
            item-text="login"
            persistent-hint
            small-chips
          >
          <template v-slot:no-data>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          </lq2-v-combobox>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <lq2-v-autocomplete
              id="autocomplete"
              :loading="loading"
              :options="items2"
              :search-input.sync="search"
              class="mx-3"
              flat
              multiple
              clearable
              item-value="id"
              item-text="login"
              label="What state are you from?"
            >
          </lq2-v-autocomplete>
        </v-flex>
        <v-flex xs12 sm12>
          <lq-v-rating id="rating" :half-increments="true" :value="3" />
        </v-flex>
        <v-flex xs12 sm12 md12>
           <lq2-v-checkbox
              id="checkbox"
              :value="2"
              multiple
              label="warning"
              color="warning"
              :hide-details="false"
            ></lq2-v-checkbox>
          </v-flex>
          <v-flex xs12 sm12 md12>
           <lq2-v-checkbox
              id="checkbox"
              :value="1"
              multiple
              label="warning 2"
              color="primary"
              hide-details
            ></lq2-v-checkbox>
          </v-flex>
          <v-flex xs12 sm12 md12>
           <lq2-v-checkbox
              id="checkbox2"
              value="Yes"
              label="warning 3"
              color="primary"
            ></lq2-v-checkbox>
          </v-flex>
          <v-flex xs12 sm12 md12>
             <lq2-v-radio-group id="my_radio" row>
              <v-radio id-index="1" value="Yes" label="Radio 1" :hide-details="true">
                <template v-slot:label>
                  <div>Definitely <strong class="primary--text">Duckduckgo</strong></div>
                </template>
              </v-radio>
              <v-radio id-index="2" value="No" label="Radio 2"/>
             </lq2-v-radio-group>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <lq2-v-switch id="my_switch" value="On" label="On"/>
          </v-flex>
          <v-layout row>
          <v-flex xs12 sm12 md12>
            <v-btn color="info" @click="init">Initialize Data</v-btn>
            <v-btn color="info" @click="getFormData">Get Form Data</v-btn>
            <v-btn color="primary" type="submit" >Submit</v-btn>
            <v-btn color="warning" @click="reset" >Reset</v-btn>
          </v-flex>
          </v-layout>
          </template>
      </lq2-v-form>
      </v-layout>
 </v-container>
</template>

<script>
import {users} from './dummyData';
import Lq2VTextField from './components/LqVTextField'
import Lq2VTextarea from './components/LqVTextarea'
import Lq2VSelect from './components/LqVSelect'
import Lq2VCombobox from './components/LqVCombobox'
import Lq2VAutocomplete from './components/LqVAutocomplete'
import Lq2VRating from './components/LqVRating'
import Lq2VCheckbox from './components/LqVCheckbox'
import Lq2VRadioGroup from './components/LqVRadioGroup'
import Lq2VSwitch from './components/LqVSwitch'
import Lq2VMobileNumber from './components/LqVMobileNumber'
import Lq2VForm from './components/LqVForm'
export default {
  name: 'playgroud',
  components: {
    Lq2VTextField,
    Lq2VForm,
    Lq2VTextarea,
    Lq2VSelect,
    Lq2VCombobox,
    Lq2VAutocomplete,
    Lq2VRating,
    Lq2VCheckbox,
    Lq2VRadioGroup,
    Lq2VSwitch,
    Lq2VMobileNumber
  },
  data: function () {

    return {
      rules: {
        name: {
          presence: {allowEmpty: false},
        },
        mobile_no: {presence: {allowEmpty: false}},
        // date_of_birth: {presence: {allowEmpty: false}},
        date_of_birth2: {presence: {allowEmpty: false}},
        autocomplete: {presence: {allowEmpty: false}},
        checkbox: {presence: {allowEmpty: false}},
        checkbox2: {presence: {allowEmpty: false}},
        my_radio: {presence: {allowEmpty: false}},
        my_switch: {presence: {allowEmpty: false}},
        textarea: {presence: {allowEmpty: false}},
        rating: {presence: {allowEmpty: false}},
        combobox: {presence: {allowEmpty: false}},
      },
      items: users.data,
      items2: users.data,
      menu: false,
      search: null,
      loading: false,
      fromData: {},
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    }
  },
  methods: {
    sendMessage: function() {
      console.log('tetsytgdfh')
    },
    SelectChange: function(data) {
      console.log("Select change", data)
    },
    getFormData: function() {
      this.fromData = this.$lqForm.formData('test_form');
    },
    reset: function() {
      this.$lqForm.resetForm('test_form');
    },
    init: function() {
      this.$lqForm.initializeValues('test_form', {
        name: '+91-8808824424',
        mobile_no: 23,
        date_of_birth: '2019-01-01',
        checkbox: [1],
        date_of_birth2: [ '2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04'],
        my_switch: 'On',
        my_radio: 'Yes',
        profile: {
          path: 'https://picsum.photos/500/300?image=100'
        },
        my_mobile_number: '+91-8808825465',
        autocomplete: [{
          'login': 'mojombo',
          'id': 1,
          'node_id': 'MDQ6VXNlcjE=',
          'avatar_url': 'https://avatars0.githubusercontent.com/u/1?v=4',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/mojombo',
          'html_url': 'https://github.com/mojombo',
          'followers_url': 'https://api.github.com/users/mojombo/followers',
          'following_url': 'https://api.github.com/users/mojombo/following{/other_user}',
          'gists_url': 'https://api.github.com/users/mojombo/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/mojombo/subscriptions',
          'organizations_url': 'https://api.github.com/users/mojombo/orgs',
          'repos_url': 'https://api.github.com/users/mojombo/repos',
          'events_url': 'https://api.github.com/users/mojombo/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/mojombo/received_events',
          'type': 'User',
          'site_admin': false

        }],
        combobox: [{
          'login': 'mojombo',
          'id': 1,
          'node_id': 'MDQ6VXNlcjE=',
          'avatar_url': 'https://avatars0.githubusercontent.com/u/1?v=4',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/mojombo',
          'html_url': 'https://github.com/mojombo',
          'followers_url': 'https://api.github.com/users/mojombo/followers',
          'following_url': 'https://api.github.com/users/mojombo/following{/other_user}',
          'gists_url': 'https://api.github.com/users/mojombo/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/mojombo/subscriptions',
          'organizations_url': 'https://api.github.com/users/mojombo/orgs',
          'repos_url': 'https://api.github.com/users/mojombo/repos',
          'events_url': 'https://api.github.com/users/mojombo/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/mojombo/received_events',
          'type': 'User',
          'site_admin': false

        }],
        'textarea': 'I am textarea.',
        'rating': 3.5
      })
    },
    searchCode: function (item, queryText, itemText) {
      console.log('I am working')
      return (item.name.indexOf(queryText) > -1 || item.code.indexOf(queryText) > -1 )
    }
  },
  created: function() {
    console.log('dummyData', this);
  }
}
</script>

<style>

</style>
