const { gql } = require("@apollo/client");

export const DASHBOARD_STATS = gql`
    query {
        dashboardStats {
            organization_count_today
            organization_count_seven_days
            site_count_today
            site_count_seven_days
            user_count_today
            user_count_seven_days
        }
    }
`;