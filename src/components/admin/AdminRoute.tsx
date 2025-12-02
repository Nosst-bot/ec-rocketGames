import { Navigate } from "react-router-dom";
import type { AdminRouteProps } from "../../client/types";

export default function AdminRoute({ children }: AdminRouteProps) {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ADMIN" && role !== "ROLE_SELLER") {
        return <Navigate to="/forbidden" />;
    }

    return children;
}
