
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/DateRange'
import LqDateRange from '@/components/LqVDateRange'
import LqVForm from '@/components/LqVForm'
// import LqVAutocomplete from "../../src/components/LqVAutocomplete";
jest.setTimeout(30000);

describe('daterange', () => {

    it('Input Should has Id in format {form_name}.{field_name}', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqDateRange)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('input')
        expect(input.element.id).toBe(`${lqForm.props().name}.${lqSelectField.props().id}`)
    })
})