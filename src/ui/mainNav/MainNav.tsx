import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { sidebarNavLinks } from './dataSource';

const NavList = styled.ul`
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        gap: 1.2rem;
        display: flex;
        align-items: center;

        font-weight: 500;
        font-size: 1.6rem;
        transition: all 0.3s;
        padding: 1.2rem 2.4rem;
        color: var(--color-grey-600);
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        transition: all 0.3s;
        color: var(--color-grey-400);
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

export default function MainNav() {
    return (
        <nav>
            <NavList>
                {sidebarNavLinks.map((link) => {
                    const { id, to, icon, name } = link;
                    const Icon = icon;

                    return (
                        <StyledNavLink key={id} to={to}>
                            <Icon />
                            <span>{name}</span>
                        </StyledNavLink>
                    );
                })}
            </NavList>
        </nav>
    );
}
