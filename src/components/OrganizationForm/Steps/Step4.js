import { useQuery } from '@apollo/client';
import { RadioGroup } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import { CheckCircleIcon, MinusCircleIcon, SelectorIcon, UserCircleIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import UserSelector from 'components/UI/UserSelector';
import { GET_ALL_USERS } from 'queries/users';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const selectUser = {first_name: "Select", last_name: "User", id: 0};

export const Step4 = (props) => {
    const {
        handleSubmit,
        setFieldValue,
        values
    } = props;

    return (
        <div className="space-y-6 mt-8">
            <UserSelector 
                name="owners"
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
                value={values.owners}
            />
        </div>
    )
}

export default Step4;