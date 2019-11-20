
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Rating'
import LqTextField from '@/components/LqVRating'
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
        const input = lqTextField.find('.v-rating')
        expect(input.element.id).toBe(`${lqForm.props().name}.${lqTextField.props().id}`)
        const rateIcon = input.findAll('i.primary--text')
        // console.log('rateIcon', rateIcon.length)
        expect(rateIcon.length).toBe(0)
    })

    it('when input has value propin initial [value should be update in store and dom]', () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name_value_test',
                value: 1
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqTextField = TextWrapper.find(LqTextField)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqTextField.find('.v-rating');
        const rateIcon = input.findAll('i.primary--text')
        expect(rateIcon.length).toBe(1)
        expect(TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqTextField.props().id]).toBe(1)

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
        const input = lqTextField.find('.v-rating');

        let newValue = 3
        TextWrapper.setProps({ value: newValue })

        await new Promise(function (reslove) {
            if (TextWrapper.vm.$store.state.form[lqForm.props().name].values[lqTextField.props().id] === newValue) {
                reslove();
            }
        })
        const rateIcon = input.findAll('i.primary--text')
        expect(rateIcon.length).toBe(newValue)
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
        const input = lqTextField.find('.v-rating');
        const newValue = 5
        
        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqTextField.props().id, newValue)
        

        await new Promise(function (reslove) {
            if (input.findAll('i.primary--text').length === newValue) {
                reslove();
            }
        })
        const rateIcon = input.findAll('i.primary--text')
        expect(rateIcon.length).toBe(newValue)
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
        const input = lqTextField.find('.v-rating');
        const newValue = 4;
        TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [lqTextField.props().id]: newValue
        })

        await new Promise(function (reslove) {
            if (input.findAll('i.primary--text').length === newValue) {
                reslove();
            }
        })
        const rateIcon = input.findAll('i.primary--text')
        expect(rateIcon.length).toBe(newValue)
    })
})