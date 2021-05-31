import React from 'react'
import Content from 'layout/Content';
import DashboardStats from 'components/DashboardStats';
import RecentActivity from '../../components/RecentActivity';
import Breadcrumbs from 'components/Breadcrumbs';

const pages = [
    { name: 'Dashboard', href: '/dashboard', current: true },
  ]

const Dashboard = () => {
    return (
        <>
            <Breadcrumbs pages={pages} />
            <Content>
                <div className="mt-4 mx-4">
                    <DashboardStats />
                </div>
                

                <div className="px-4">
                    <RecentActivity />
                </div>
                
                
            </Content>
        </>
    )
}

export default Dashboard;
