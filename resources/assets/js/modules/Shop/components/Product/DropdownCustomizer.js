import React  from 'react'
import { withLocalize } from 'react-localize-redux'

const normal = 'product-option-btn'

export default withLocalize(({ translate, customization, value, onChange }) => {
    const { name, values } = customization;
    return (
        <React.Fragment>
            <select className="custom-select" value={value} onChange={onChange}>
                { values.map((value, i) => {
                    return <option key={i} value={value.name}>
                        { translate('shop.customizations.' + name + '.values.' + value.name) }
                    </option>
                }) }
            </select>
        </React.Fragment>
    )
})
