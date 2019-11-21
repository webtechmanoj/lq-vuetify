
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Autocomplete'
import LqVSelect from '@/components/LqVAutocomplete'
import LqVForm from '@/components/LqVForm'
import LqVAutocomplete from "../../src/components/LqVAutocomplete";
jest.setTimeout(30000);

describe('Autocomplete2', () => {
    it('Search', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_search',
                action: 'https://api.github.com/users',
                responseKey: 'data',
                itemText: 'login',
                groupBy: 'type',
                fetchOnSearch: true,
                staticData: { since: 13 }
            },
            store,
            mocks: { '$helper': helper }
        })

        const lqSelectField = TextWrapper.find(LqVAutocomplete)
        const vselect = lqSelectField.find({ ref: 'lqel' })
        const input = vselect.find('input')
        const element = input.element

        const update = jest.fn()
        vselect.vm.$on('update:searchInput', update)

        element.value = 'test'
        input.trigger('input')
        // console.log('element.value', element.value)

        await vselect.vm.$nextTick()

        expect(update).toHaveBeenCalledWith('test')
    })
})