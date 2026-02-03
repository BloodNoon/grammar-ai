import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import DashboardProfile from '../components/DashboardProfile';
import UserList from '../components/UserList';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
// import ProgressDashboard from '../components/ProgressDashboard';

export default function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <Layout>
            <Tabs size="lg" variant="enclosed" minW="60vw" my="2rem">
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>My Progress</Tab> {}
                    {currentUser?.data.role === 'admin' && <Tab>Users</Tab>}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DashboardProfile />
                    </TabPanel>

                    {}
                    <TabPanel> {}
                        {/* <ProgressDashboard /> {} */}
                    </TabPanel> {}

                    {currentUser?.data.role === 'admin' && (
                        <TabPanel>
                            <UserList />
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
        </Layout>
    );
}
