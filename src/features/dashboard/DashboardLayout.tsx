import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
    gap: 2.4rem;
    display: grid;
    grid-template-rows: auto 34rem auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function DashboardLayout() {
    return (
        <StyledDashboardLayout>
            <div>statistics</div>
            <div>today's activity</div>
            <div>chart stay duration</div>
            <div>chart sales</div>
        </StyledDashboardLayout>
    );
}
