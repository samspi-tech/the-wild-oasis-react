import Filter from '@/ui/Filter';
import { dashboardFilters } from './dataSource';

function DashboardFilter() {
    return <Filter searchParameter="last" options={dashboardFilters} />;
}

export default DashboardFilter;
