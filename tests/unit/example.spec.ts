import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('works', () => {
    const wrapper = shallowMount(App)

    expect(true).toBeTruthy()
  })
})
