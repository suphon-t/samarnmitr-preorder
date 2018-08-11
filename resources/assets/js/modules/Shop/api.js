import Http from '../../utils/Http'

const sets = [
    {
        text: 'Set 1 Text'
    },
    {
        text: 'Set 2 Text'
    },
    {
        text: 'Set 3 Text'
    },
]

const mockSets = realCall => {
    return new Promise((resolve, reject) => {
        realCall
            .then(result => {
                resolve({
                    ...result,
                    data: {
                        ...result.data,
                        sets
                    }
                })
            })
            .catch(reject)
    })
}

export const fetchProducts = () => mockSets(Http.get('shop/products'))

export const makeOrder = contents => Http.put('shop/orders', contents)

export const fetchOrder = () => Http.get('shop/myOrder')
