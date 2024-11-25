import React from "react";
import { Navigate, useOutletContext, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const context = useOutletContext();
	console.log(context)
	if (!context.user) {
		return <Navigate to="/" replace />;
	}

	return <Outlet context={context}/>;
};

export default ProtectedRoute;