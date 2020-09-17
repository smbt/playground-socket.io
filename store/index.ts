import { getSecondsSinceMidnight } from '~/lib/date'

export const state = () => ({
    debug: true,
    loggedInUser: {
        id: 0,
        firstName: 'Max',
        lastName: 'Mustermann',
        gender: 'male',
        state: 'connected',
        face: 'neutral',
        lastUpdated: getSecondsSinceMidnight(),
    },
})

export const mutations = {
    toggleDebug(state) {
        state.debug = !state.debug
    },
}
