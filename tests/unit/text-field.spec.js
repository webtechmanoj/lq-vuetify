
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/TextField'
import LqTextField from '@/components/LqVTextField'
import LqVForm from '@/components/LqVForm'


describe('TextField', () => {
    
    it('Input Should has Id in format {form_name}.{field_name}', () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find(`input[id="${lqForm.props().name}.${lqTextField.props().id}"]`)
        expect(input.is('input')).toBe(true)
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
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find('input');

        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqTextField.props().id]).toBe(lqTextField.props().value)
        expect(input.element.value).toBe(lqTextField.props().value)
    })
    it('When input value prop change after component created [value should be update in store and dom]', async () => {

        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_value_test',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find('input');

        let newValue = 'I am new value and changed after componenet created.'
        TextWrapper.setProps({ value: newValue })

        await new Promise(function (reslove) {
            if (TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqTextField.props().id] === newValue) {
                reslove();
            }
        })
        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqTextField.props().id]).toBe(lqTextField.props().value)
        expect(input.element.value).toBe(lqTextField.props().value)
    })

    it('When store value change using the function $lqForm.setElementVal', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: '_test_2',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find('input');
        const newValue = 'I am value and update in store first.'
        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqTextField.props().id, newValue)

        await new Promise(function (reslove) {
            if (input.element.value === newValue) {
                reslove();
            }
        })
        expect(input.element.value).toBe(newValue)
    })
    it('When value initialize [input value should also update]', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: '_test_3',
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find('input');
        const newValue = 'Initial value';
        TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [lqTextField.props().id]: newValue
        })

        await new Promise(function (reslove) {
            if (input.element.value === newValue) {
                reslove();
            }
        })
        expect(input.element.value).toBe(newValue)
    })
})