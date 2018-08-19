import React  from 'react'
import { withLocalize } from 'react-localize-redux'

export default withLocalize(({ translate, customization, value, onChange, className = "" }) => {
    const { name, values } = customization;
    return (
        <select className={"custom-select " + className} value={value} onChange={onChange}>
            { values.map((value, i) => {
                return <option key={i} value={value.name}>
                    { translate('shop.customizations.' + name + '.values.' + value.name) }
                </option>
            }) }
        </select>
    )
})
