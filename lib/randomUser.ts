import { v4 as uuid } from 'uuid'
import { user } from '~/types/user'

const getRandomArrayElement = (array: any[]): string => {
    return array[Math.floor(Math.random() * array.length)]
}

export const getRandomUser = (i: string) => {
    const firstNames = [
        'Ross',
        'Rachel',
        'Monica',
        'Joey',
        'Phoebe',
        'Chandler',
    ]
    const lastNames = [
        'Geller',
        'Green',
        'Geller',
        'Tribbiani',
        'Buffay',
        'Bing',
    ]

    const id = i
    const firstName = getRandomArrayElement(firstNames)
    const lastName = getRandomArrayElement(lastNames)

    return {
        id,
        firstName,
        lastName,
    }
}

export const getRandomUserList = (n: number) => {
    const randomUsers: user[] = []
    for (let i = 1; i < n + 1; i++) {
        randomUsers.push(getRandomUser(uuid()))
    }
    return randomUsers
}
