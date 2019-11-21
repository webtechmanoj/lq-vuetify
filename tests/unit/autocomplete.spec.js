
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Autocomplete'
import LqVSelect from '@/components/LqVAutocomplete'
import LqVForm from '@/components/LqVForm'
import LqVAutocomplete from "../../src/components/LqVAutocomplete";
jest.setTimeout(30000);

describe('Autocomplete', () => {

    it('Input Should has Id in format {form_name}.{field_name}', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name',
                action: 'https://api.github.com/users',
                responseKey: 'data',
                itemText: 'login',
                groupBy: 'type',
                staticData: { since: 13 }
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVSelect)
        const lqForm = TextWrapper.find(LqVForm)
        const input = lqSelectField.find('input')


        expect(lqSelectField.vm.requesting).toBe(true)
        expect(input.element.id).toBe(`${lqForm.props().name}.${lqSelectField.props().id}`)

        await new Promise((reslove) => {
            setInterval(() => {
                if (lqSelectField.vm.requesting === false) {
                    reslove()
                }
            }, 500)

        })
        expect(lqSelectField.findAll('.v-list__tile').length > 1).toBe(true)
        lqSelectField.find('div[role="listitem"] a').trigger('click');
        expect(lqSelectField.vm.items[0].id === TextWrapper.vm.$store.state.form._test.values.name.id).toBe(true)

        lqSelectField.setProps({
            staticData: { since: 14 }
        })

        expect(lqSelectField.vm.requesting).toBe(true)
        await new Promise((reslove) => {
            setInterval(() => {
                if (lqSelectField.vm.requesting === false) {
                    reslove()
                }
            }, 500)
        })

        expect(lqSelectField.findAll('.v-list__tile').length > 1).toBe(true)
        lqSelectField.find('div[role="listitem"] a').trigger('click');
        expect(lqSelectField.vm.items[0].id === TextWrapper.vm.$store.state.form._test.values.name.id).toBe(true)
        expect(lqSelectField.vm.formatter() === lqSelectField.vm.items[0].id).toBe(true)

        lqSelectField.setProps({
            isOutputObject: true
        })
        expect(lqSelectField.vm.formatter().id === lqSelectField.vm.items[0].id).toBe(true)
    })

    it('When already has value and more', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name2',
                responseKey: 'data',
                itemText: 'login',
                value: {
                    login: 'Hitesh',
                    id: 1
                },
                options: [
                    {
                        login: 'Hitesh',
                        id: 1
                    },
                    {
                        login: 'Hitesh2',
                        id: 2
                    }
                ]
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVSelect)
        const lqForm = TextWrapper.find(LqVForm)

        await TextWrapper.vm.$nextTick();

        // const input = lqSelectField.find('input')
        // console.log('lqSelectField', lqSelectField.html())
        expect(lqSelectField.find('.v-list__tile--active .v-list__tile__title').text() === 'Hitesh').toBe(true)
        expect(1 === TextWrapper.vm.$store.state.form._test.values.name2.id).toBe(true)

        TextWrapper.vm.$lqForm.setElementVal(lqForm.props().name, lqSelectField.props().id, {
            login: 'Hitesh2',
            id: 2
        })
        await TextWrapper.vm.$nextTick();
        // console.log('lqSelectField', lqSelectField.html())
        expect(2 === TextWrapper.vm.$store.state.form._test.values.name2.id).toBe(true)
        expect(lqSelectField.find('.v-list__tile--active .v-list__tile__title').text() === 'Hitesh2').toBe(true)
    })

    it('When value initialize [input value should also update]', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name2',
                responseKey: 'data',
                itemText: 'login',
                value: {
                    login: 'Hitesh',
                    id: 1
                },
                options: [
                    {
                        login: 'Hitesh',
                        id: 1
                    },
                    {
                        login: 'Hitesh2',
                        id: 2
                    }
                ]
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqSelectField = TextWrapper.find(LqVSelect)
        const lqForm = TextWrapper.find(LqVForm)
        const vselect = lqSelectField.find({ ref: 'lqel' })
        const newValue = {
            login: 'Hitesh2',
            id: 2
        };
        TextWrapper.vm.$lqForm.initializeValues(lqForm.props().name, {
            [lqSelectField.props().id]: newValue
        })
        await vselect.vm.$nextTick()
        expect(2 === TextWrapper.vm.$store.state.form._test.values.name2.id).toBe(true)
        // console.log('Tets', lqSelectField.html())
        expect(lqSelectField.find('.v-list__tile--active .v-list__tile__title').text() === 'Hitesh2').toBe(true)
    })
})