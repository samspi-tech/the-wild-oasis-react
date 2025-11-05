import {
    type Path,
    type FieldValues,
    type UseFormRegister,
} from 'react-hook-form';

import { useState } from 'react';
import styled from 'styled-components';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

type InputPasswordProps<T extends FieldValues> = {
    id: Path<T>;
    isDisabled?: boolean;
    autoComplete?: string;
    register: UseFormRegister<T>;
};

const InputContainer = styled.div`
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-grey-300);
`;

const Icon = styled.span`
    top: 50%;
    right: 5px;
    position: absolute;
    transform: translateY(-50%);

    display: flex;
    align-items: center;

    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: color 100ms ease-in-out;

    &:hover {
        color: #ff0000;
    }
`;

export default function InputPassword<T extends FieldValues>({
    id,
    register,
    isDisabled,
    autoComplete,
}: InputPasswordProps<T>) {
    const [inputType, setInputType] = useState('password');

    const handleToggleShowPassword = () => {
        inputType === 'password'
            ? setInputType('text')
            : setInputType('password');
    };

    return (
        <InputContainer>
            <Input
                id={id}
                type={inputType}
                {...register(id)}
                disabled={isDisabled}
                autoComplete={autoComplete}
            />
            <Icon
                aria-label="Toggle show password"
                onClick={handleToggleShowPassword}
            >
                {inputType === 'password' ? <HiEye /> : <HiEyeSlash />}
            </Icon>
        </InputContainer>
    );
}
