
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Radio'
import LqVCheckbox from '@/components/LqVRadioGroup'
import LqVForm from '@/components/LqVForm'


describe('Radio', () => {

    it('Input Should has Id in format {form_name}.{field_name}', () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('.v-input--radio-group')
        expect(input.element.id).toBe(`${lqForm.props().name}.${lqSelectField.props().id}`)
    })


    it('When store has already value and form rendered [Checkbox should checked already.]', async () => {

        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_value_test',
            },
            store,
            mocks: { '$helper': helper }
        })

        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('.v-input--radio-group');
        TextWrapper.setProps({ value: 'Yes' })
        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, 'Yes')
        expect(input.findAll('input:checked').length).toBe(1)

    })


    it('When value initialize [input value should also update]', async () => {

        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_value_test',
                value: 'Yes'
            },
            store,
            mocks: { '$helper': helper }
        })

        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('.v-input--radio-group');
        TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [lqSelectField.props().id]: 'Yes'
        })
        expect(input.findAll('input:checked').length).toBe(1)
    })
})