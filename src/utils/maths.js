export const sum = (arr = [], pathToKey = "", index = null) => {
    let result = 0;

    for (const data of arr) {
        // const val = index ? data[index][pathToKey] : data[pathToKey]
        result += data
    }
    return result
}

export const averageValue = (arr = []) => {
    if (arr.length) return Math.round(sum(arr) / arr.length)
    return 0
}

export const medianValue = (arr = []) => {
    if (arr.length) {
        const sortedArr = arr.sort((a,b) => a - b)
        const length = sortedArr.length
        const middleIndex = parseInt(sortedArr.length / 2)
        if (length % 2 === 1) {
            return sortedArr[middleIndex]
        } else {
            return Math.round((sortedArr[middleIndex] + sortedArr[middleIndex - 1]) / 2)
        }
    }
    return 0
}