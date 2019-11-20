
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Switch'
import LqVCheckbox from '@/components/LqVSwitch'
import LqVForm from '@/components/LqVForm'


describe('Checkbox', () => {
    
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
        const input = lqSelectField.find('input')
        expect(input.element.id).toBe(`${lqForm.props().name}.${lqSelectField.props().id}`)
    })

    it('when input has value propin initial [value should be update in store and dom]', () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_value_test',
                value: 'H1'
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('input');
        input.setChecked(true);
        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqSelectField.props().id]).toBe(lqSelectField.props().value)
        expect(input.element.value).toBe(lqSelectField.props().value)
        input.setChecked(false);

        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqSelectField.props().id]).toBe(null)
        expect(input.element.value).toBe(lqSelectField.props().value)

    })
    it('When store has already value and form rendered [Checkbox should checked already.]', async () => {

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
        const input = lqSelectField.find('input');
        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, 'Yes')
        expect(input.element.getAttribute('aria-checked')).toBe('true')

        const TextWrapper1 = mount(TextField, {
            propsData: {
                id: 'name_value_test',
                value: 'Yes'
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField1 = TextWrapper1.find(LqVCheckbox)
        const input1 = lqSelectField1.find('input');
        expect(input1.element.getAttribute('aria-checked')).toBe('true')
        
    })

    it('When input value prop change after component created [dom input value should also update]', async () => {

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
        const input = lqSelectField.find('input');
        TextWrapper.setProps({value: 'No'})
        expect(input.element.value).toBe('No')
        
                //
        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, 'No')
        expect(input.element.getAttribute('aria-checked')).toBe('true')

        //
        TextWrapper.setProps({ value: 'Yes' })
        expect(input.element.getAttribute('aria-checked')).toBe('false')
        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqSelectField.props().id]).toBe(null)

    })

    it('When store value change using the function $lqForm.setElementVal', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: '_test_2',
                value: 'Yes'
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('input');

        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, 'Yes')
        expect(input.element.getAttribute('aria-checked')).toBe('true')

        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, 'No')
        expect(input.element.getAttribute('aria-checked')).toBe('false')
    })
    
    it('When value initialize [input value should also update]', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: '_test_3',
                value: 'Yes'
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVCheckbox)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('input');
        TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [lqSelectField.props().id]: 'Yes'
        })

        await new Promise(function (reslove) {
            if (input.element.value === 'Yes') {
                reslove();
            }
        })
        expect(input.element.getAttribute('aria-checked')).toBe('true')
    })
})