/* eslint-disable jest/valid-expect */
import React from 'react'
import { mount } from '@cypress/react'
import App from '../App'

type LoginInfo = {
  username: string
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
}

beforeEach(() => {
  mount(<App />)
  cy.routerNavigate('/signup')
})

it('App loads', () => {
  cy.get('main').should('be.visible')
})

const loginInfo: Partial<LoginInfo> = {
  username: 'testUsername',
  email: 'test@ufl.edu',
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  confirmPassword: 'password',
}

const enterCredentials = (info: Record<string, string>) => {
  let k: keyof typeof info
  for (k in info) {
    cy.get(`input[name="${k}"]`).type(info[k])
  }

}

it('Able to enter credentials', () => {
  enterCredentials(loginInfo)
  let k: keyof typeof loginInfo
  for (k in loginInfo) {
    cy.get(`input[name="${k}"]`).should('have.value', loginInfo[k])
  }
})

it('Passwords must match', () => {
  const botchedLoginInfo = {...loginInfo, confirmPassword: 'notMatching'}
  enterCredentials(botchedLoginInfo)
  cy.get('button').click()
  cy.get('input[name="confirmPassword"]').should('have.attr', 'aria-invalid', 'true')
})

it('All fields must be filled out', () => {
  const botchedLoginInfo = {...loginInfo}
  delete botchedLoginInfo['firstName']

  enterCredentials(botchedLoginInfo)
  cy.get('button').click()
  cy.get('input[name="firstName"]').should('have.attr', 'aria-invalid', 'true')
})

it('Able to sign up successfully', () => {
  cy.intercept('POST', '/api/users').as('createUserEndpoint')
  enterCredentials(loginInfo)
  cy.get('button').click()

  return cy.wait('@createUserEndpoint').then(({request}) => {
    expect(request.body).to.deep.equal({
      Email: loginInfo['email'],
      FirstName: loginInfo['firstName'],
      LastName: loginInfo['lastName'],
      Password: loginInfo['password'],
      Username: loginInfo['username'],
    })
  })  
})



