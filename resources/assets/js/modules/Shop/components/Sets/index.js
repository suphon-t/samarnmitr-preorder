import React from 'react'

import Set from './Set'

export default props => (
    <div className="sets-container">
        { props.sets.map((set, i) => (<Set key={i} set={set} />)) }
    </div>
)
