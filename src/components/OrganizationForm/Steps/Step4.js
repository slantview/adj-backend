import { RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useQuery } from '@apollo/client';
import React, { useState, Fragment, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, MinusCircleIcon, SelectorIcon, UserCircleIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react'
import _ from 'lodash';
import { GET_ALL_USERS } from 'queries/users';
import UserSelector from 'components/UI/UserSelector';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const selectUser = {first_name: "Select", last_name: "User", id: 0};

export const Step4 = (props) => {
    const {
        handleSubmit,
        setFieldValue
    } = props;

    return (
        <div className="space-y-6 mt-8">
            <UserSelector 
                 handleSubmit={handleSubmit}
                 setFieldValue={setFieldValue}
            />
        </div>
    )
}

export default Step4;