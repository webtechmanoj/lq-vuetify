
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import MobileField from '@/dev/test/Mobile'
import LqVMobileNumber from '@/components/LqVMobileNumber'
import LqVForm from '@/components/LqVForm'


describe('Mobile No', () => {

    it('Input Should has Id in format {form_name}.{field_name}', () => {
        const MobileWrapper = mount(MobileField, {
            propsData: {
                id: 'name',
            },
            store,
            mocks: { '$helper': helper }
        })
        const mobilefield = MobileWrapper.find(LqVMobileNumber)
        const lqForm = MobileWrapper.find(LqVForm)
        const input = mobilefield.find('.v-text-field__slot input')
        expect(input.element.id).toBe(`${lqForm.props().name}.${mobilefield.props().id}`)
    })


    it('when has value props [store should be updated.]', async () => {

        const MobileWrapper = mount(MobileField, {
            propsData: {
                id: 'name_value_test',
                value: '+91-8808824424'
            },
            store,
            mocks: { '$helper': helper }
        })

        const mobilefield = MobileWrapper.find(LqVMobileNumber)
        const lqForm = MobileWrapper.find(LqVForm)
        const input = mobilefield.find('.v-text-field__slot input')
        const select = mobilefield.find('.v-select-list')

        mobilefield.setData({
            calling_code_list: [
                {
                    "name": "Iceland",
                    "code": "+354",
                    "flag": "https:\/\/restcountries.eu\/data\/isl.svg",
                    "country_code": "IS"
                },
                {
                    "name": "India",
                    "code": "+91",
                    "flag": "https:\/\/restcountries.eu\/data\/ind.svg",
                    "country_code": "IN"
                },
                {
                    "name": "Indonesia",
                    "code": "+62",
                    "flag": "https:\/\/restcountries.eu\/data\/idn.svg",
                    "country_code": "ID"
                },
                {
                    "name": "C\u00f4te d'Ivoire",
                    "code": "+225",
                    "flag": "https:\/\/restcountries.eu\/data\/civ.svg",
                    "country_code": "CI"
                }
            ]
        })

        expect(input.element.value).toBe('8808824424')
        expect(MobileWrapper.vm.$store.state.form[lqForm.props().name].values[mobilefield.props().id]).toBe('+91-8808824424')
        expect(select.find('.primary--text .v-list__tile__title').text()).toBe('+91')

    })

    it('When store value change using the function $lqForm.setElementVal', async () => {

        const MobileWrapper = mount(MobileField, {
            propsData: {
                id: 'name_value_test',
            },
            store,
            mocks: { '$helper': helper }
        })

        const mobilefield = MobileWrapper.find(LqVMobileNumber)
        const lqForm = MobileWrapper.find(LqVForm)
        const input = mobilefield.find('.v-text-field__slot input')
        const select = mobilefield.find('.v-select-list')
        MobileWrapper.vm.$lqForm.setElementVal(lqForm.props().name, mobilefield.props().id, '+91-8808824424')

        mobilefield.setData({
            calling_code_list: [
                {
                    "name": "Iceland",
                    "code": "+354",
                    "flag": "https:\/\/restcountries.eu\/data\/isl.svg",
                    "country_code": "IS"
                },
                {
                    "name": "India",
                    "code": "+91",
                    "flag": "https:\/\/restcountries.eu\/data\/ind.svg",
                    "country_code": "IN"
                },
                {
                    "name": "Indonesia",
                    "code": "+62",
                    "flag": "https:\/\/restcountries.eu\/data\/idn.svg",
                    "country_code": "ID"
                },
                {
                    "name": "C\u00f4te d'Ivoire",
                    "code": "+225",
                    "flag": "https:\/\/restcountries.eu\/data\/civ.svg",
                    "country_code": "CI"
                }
            ]
        })

        expect(input.element.value).toBe('8808824424')
        expect(MobileWrapper.vm.$store.state.form[lqForm.props().name].values[mobilefield.props().id]).toBe('+91-8808824424')
        expect(select.find('.primary--text .v-list__tile__title').text()).toBe('+91')

    })

    it('When input value prop change after component created [value should be update in store and dom]', async () => {
        const MobileWrapper = mount(MobileField, {
            propsData: {
                id: 'name_value_test',
            },
            store,
            mocks: { '$helper': helper }
        })

        const mobilefield = MobileWrapper.find(LqVMobileNumber)
        const lqForm = MobileWrapper.find(LqVForm)
        const input = mobilefield.find('.v-text-field__slot input')
        const select = mobilefield.find('.v-select-list')
        mobilefield.setProps({
            'value': '+91-8808824424'
        })
        mobilefield.setData({
            calling_code_list: [
                {
                    "name": "Iceland",
                    "code": "+354",
                    "flag": "https:\/\/restcountries.eu\/data\/isl.svg",
                    "country_code": "IS"
                },
                {
                    "name": "India",
                    "code": "+91",
                    "flag": "https:\/\/restcountries.eu\/data\/ind.svg",
                    "country_code": "IN"
                },
                {
                    "name": "Indonesia",
                    "code": "+62",
                    "flag": "https:\/\/restcountries.eu\/data\/idn.svg",
                    "country_code": "ID"
                },
                {
                    "name": "C\u00f4te d'Ivoire",
                    "code": "+225",
                    "flag": "https:\/\/restcountries.eu\/data\/civ.svg",
                    "country_code": "CI"
                }
            ]
        })

        expect(input.element.value).toBe('8808824424')
        expect(MobileWrapper.vm.$store.state.form[lqForm.props().name].values[mobilefield.props().id]).toBe('+91-8808824424')
        expect(select.find('.primary--text .v-list__tile__title').text()).toBe('+91')
    })


    it('When value initialize [input value should also update]', async () => {
        const MobileWrapper = mount(MobileField, {
            propsData: {
                id: 'name_value_test',
            },
            store,
            mocks: { '$helper': helper }
        })

        const mobilefield = MobileWrapper.find(LqVMobileNumber)
        const lqForm = MobileWrapper.find(LqVForm)
        const input = mobilefield.find('.v-text-field__slot input')
        const select = mobilefield.find('.v-select-list')
        MobileWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [mobilefield.props().id]: '+91-8808824424'
        })
        mobilefield.setData({
            calling_code_list: [
                {
                    "name": "Iceland",
                    "code": "+354",
                    "flag": "https:\/\/restcountries.eu\/data\/isl.svg",
                    "country_code": "IS"
                },
                {
                    "name": "India",
                    "code": "+91",
                    "flag": "https:\/\/restcountries.eu\/data\/ind.svg",
                    "country_code": "IN"
                },
                {
                    "name": "Indonesia",
                    "code": "+62",
                    "flag": "https:\/\/restcountries.eu\/data\/idn.svg",
                    "country_code": "ID"
                },
                {
                    "name": "C\u00f4te d'Ivoire",
                    "code": "+225",
                    "flag": "https:\/\/restcountries.eu\/data\/civ.svg",
                    "country_code": "CI"
                }
            ]
        })

        expect(input.element.value).toBe('8808824424')
        expect(MobileWrapper.vm.$store.state.form[lqForm.props().name].values[mobilefield.props().id]).toBe('+91-8808824424')
        expect(select.find('.primary--text .v-list__tile__title').text()).toBe('+91')

        // const TextWrapper = mount(TextField, {
        //     propsData: {
        //         id: 'name_value_test',
        //         value: 'Yes'
        //     },
        //     store,
        //     mocks: { '$helper': helper }
        // })

        // const lqSelectField = TextWrapper.find(LqVCheckbox)
        // const lqForm = TextWrapper.find(LqVForm)
        // const input = lqSelectField.find('.v-input--radio-group');
        // TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
        //     [lqSelectField.props().id]: 'Yes'
        // })
        // expect(input.findAll('input:checked').length).toBe(1)
    })
})