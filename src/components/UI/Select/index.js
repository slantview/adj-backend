import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'

const Select = (props) => {
    const {
        items,
        defaultValue
    } = props;

    const [selected, setSelected] = useState(defaultValue);

    return (
        <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button>{selected.name}</Listbox.Button>
            <Listbox.Options>
                {items.map((item) => (
                    <Listbox.Option
                        key={item.id}
                        value={item}>
                            {item.name}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}

export default Select;