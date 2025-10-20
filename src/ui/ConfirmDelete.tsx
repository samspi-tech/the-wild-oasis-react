import Button from './Button';
import Heading from './Heading';
import styled from 'styled-components';

const StyledConfirmDelete = styled.div`
    width: 40rem;

    gap: 1.2rem;
    display: flex;
    flex-direction: column;

    & p {
        margin-bottom: 1.2rem;
        color: var(--color-grey-500);
    }

    & div {
        gap: 1.2rem;
        display: flex;
        justify-content: flex-end;
    }
`;

type ConfirmDeleteProps = {
    isDisabled: boolean;
    resourceName: string;
    onClose?: () => void;
    onConfirm: () => void;
};

export default function ConfirmDelete({
    onClose,
    onConfirm,
    isDisabled,
    resourceName,
}: ConfirmDeleteProps) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
                Are you sure you want to delete {resourceName} permanently? This
                action cannot be undone.
            </p>
            <div>
                <Button
                    onClick={onClose}
                    variation="secondary"
                    disabled={isDisabled}
                >
                    Cancel
                </Button>
                <Button
                    variation="danger"
                    onClick={onConfirm}
                    disabled={isDisabled}
                >
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}
