
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/Combobox'
import LqVSelect from '@/components/LqVCombobox'
import LqVForm from '@/components/LqVForm'
// import LqVAutocomplete from "../../src/components/LqVAutocomplete";
jest.setTimeout(30000);

describe('combobox', () => {

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
})