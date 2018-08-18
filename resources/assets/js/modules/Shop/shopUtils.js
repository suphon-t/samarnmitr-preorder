export const findItemFromList = (id, list, column) => {
    // noinspection EqualityComparisonWithCoercionJS
    return list.find(item => item[column] == id)
}

export const findItemWithColumn = (id, column, ...sources) => {
    for (let i = 0; i < sources.length; i++) {
        const item = findItemFromList(id, sources[i], column)
        if (item) {
            return item
        }
    }
    return null
}


export const findItem = (id, ...sources) => {
    return findItemWithColumn(id, 'id', ...sources)
}

export const replace = (collection, match, newItem) =>
    collection.map(item => item === match ? newItem : item)

export const getImage = id => "/images/products/" + id + "/thumbnail.png"
export const getSlideImage = (id, position) => "/images/products/" + id + "/slide" + position + ".jpg"
