import { v4 as uuid } from 'uuid'
import { getRandomUser } from '~/lib/randomUser'

export const state = () => ({
    debug: true,
    loggedInUser: getRandomUser(uuid()),
})

export const mutations = {}
