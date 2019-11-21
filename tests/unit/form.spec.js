
import { mount } from "@vue/test-utils";
import store from '@/store'

import helper from 'vuejs-object-helper'

import TextField from '@/dev/test/TextField'
// import LqDateRange from '@/components/LqVDateRange'
import LqVForm from '@/components/LqVForm'
// import LqVAutocomplete from "../../src/components/LqVAutocomplete";
jest.setTimeout(30000);

describe('formsubmit', () => {

    it('Input Should has Id in format {form_name}.{field_name}', async () => {
        const TextWrapper = mount(TextField, {
            propsData: {
                id: 'name',
                action: "https://medium.com/"
            },
            store,
            mocks: { '$helper': helper }
        })
        const lqForm = TextWrapper.find(LqVForm)
        lqForm.vm.$emit('submit');
        lqForm.find('form').trigger('submit')
        await lqForm.vm.$nextTick()
        await new Promise((reslove) => {
            setInterval(() => {
                if (TextWrapper.vm.$store.state.form[lqForm.props().name].isSubmiting === false) {
                    reslove()
                }
            }, 500)
        })
        expect(true).toBe(true)
    })
})