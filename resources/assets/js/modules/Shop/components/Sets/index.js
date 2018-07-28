import React from 'react'

import Set from './Set'
import Divider from '../Divider'

const data = [
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

export default () => (
    <div style={{ width: '100%' }}>
        <div className="sets-container">
            { data.map((set, i) => (<Set key={i} set={set} />)) }
        </div>
        <Divider />
    </div>
)
