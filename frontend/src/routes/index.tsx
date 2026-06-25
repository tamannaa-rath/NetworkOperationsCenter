import { createBrowserRouter } from "react-router-dom";
import AlertsPage from "../pages/AlertsPage";
import AuditLogsPage from "../pages/AuditLogsPage";
import DashboardPage from "../pages/DashboardPage";
import DevicesPage from "../pages/DevicesPage";
import IncidentsPage from "../pages/IncidentsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage/>
    },
    {
        path: "/alerts",
        element: <AlertsPage/>
    },
    {
        path: "/audit-logs",
        element: <AuditLogsPage/>
    },
    {
        path: "/devices",
        element: <DevicesPage/>
    },
    {
        path: "/incidents",
        element: <IncidentsPage/>
    },
])
