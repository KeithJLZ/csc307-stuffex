import Enzyme, { shallow ,mount} from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import Profile from './components/NoNavProfile'

Enzyme.configure({ adapter: new Adapter() })

/**
 * TWO critical functionalities of the input form:
 * 1. password is hidden while typing on the form
 * 2. form cannot submit with missing data
 */

test('Form inputs present', () => {
  const component = shallow(
      <Profile />
  )

  const usernameInput = component.find('#username')
  const passwordInput = component.find('#password')
  const emailInput = component.find('#email')
  const phoneInput = component.find('#phone')

  expect(usernameInput).toHaveLength(1)
  expect(passwordInput).toHaveLength(1)
  expect(emailInput).toHaveLength(1)
  expect(phoneInput).toHaveLength(1)

  expect(usernameInput.prop('name')).toEqual('username')
  expect(passwordInput.prop('name')).toEqual('password')
  expect(emailInput.prop('name')).toEqual('email')
  expect(phoneInput.prop('name')).toEqual('phone')
})

test('Password hidden when typing', () => {
  const component = shallow(<Profile />)
  const passwordInput = component.find('#password')

  // Check that password input's type is password
  expect(passwordInput.prop('type')).toEqual('password')
})

test('Check no form submission with no input', () => {
  const updateObject = jest.fn()

  const component = mount(<Profile handleProfile={updateObject} />)

  // Immediately press submit without inputting data
  component.find('#submitButton').simulate('click')

  expect(updateObject).not.toHaveBeenCalled()
})
