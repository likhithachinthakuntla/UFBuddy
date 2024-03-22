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
  cy.routerNavigate('/login')
})

it('App loads', () => {
  cy.get('main').should('be.visible')
})

const loginInfo: Partial<LoginInfo> = {
  username: 'testUsername',
  password: 'password',
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

it('All fields must be filled out', () => {
  const botchedLoginInfo = {...loginInfo}
  delete botchedLoginInfo['password']
  enterCredentials(botchedLoginInfo)
  cy.get('button').click()
  cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true')
})

it('Able to log in successfully', () => {
  cy.intercept('POST', '/api/users/login').as('loginEndpoint')
  enterCredentials(loginInfo)
  cy.get('button').click()
  return cy.wait('@loginEndpoint').then(({request}) => {
    expect(request.body).to.deep.equal({
      Password: loginInfo['password'],
      Username: loginInfo['username'],
    })
  })  
})



