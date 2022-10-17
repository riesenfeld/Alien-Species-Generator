import { mount } from '@vue/test-utils'
import InformationCard from '@/components/InformationCard.vue'

describe('InformationCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(InformationCard)
    expect(wrapper.vm).toBeTruthy()
  })
})
