import { averageValue, medianValue, sum } from "../maths"

const avgTests = [
    {
        name: "no data",
        entry: [],
        expected: 0
    },
    {
        name: "1 data",
        entry: [1],
        expected: 1
    },
    {
        name: "multiple data",
        entry: [3, 7, 11],
        expected: 7
    }
]

const medTests = [
    {
        name: "no data",
        entry: [],
        expected: 0
    },
    {
        name: "1 data",
        entry: [1],
        expected: 1
    },
    {
        name: "multiple even",
        entry: [3, 7],
        expected: 5
    },
    {
        name: "multiple odd",
        entry: [3, 4, 6],
        expected: 4
    },

]

const sumTests = [
    {
        name: "no data",
        entry: [],
        expected: 0
    },
    {
        name: "undefined",
        entry: undefined,
        expected: 0
    },
    {
        name: "1 data",
        entry: [15],
        expected: 15
    },
    {
        name: "multiple data",
        entry: [15, 14, 16],
        expected: 45
    }
]

describe("maths.js", () => {

    for (const test of sumTests) {
        const { name, entry, expected } = test
        it(`should check for average calculation - ${name}`, () => {
            const actual = sum(entry)
            expect(actual).toEqual(expected)
        })
        
    }

    for (const test of medTests) {
        const { name, entry, expected } = test
        it(`should check for average calculation - ${name}`, () => {
            const actual = medianValue(entry)
            expect(actual).toEqual(expected)
        })
        
    }

    for (const test of avgTests) {
        const { name, entry, expected } = test
        it(`should check for average calculation - ${name}`, () => {
            const actual = averageValue(entry)
            expect(actual).toEqual(expected)
        })   
    }
})