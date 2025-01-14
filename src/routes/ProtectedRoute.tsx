import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectCurrentUserDetail } from "../auth/authSlice"

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const userDetail = useAppSelector(selectCurrentUserDetail)
    if(!userDetail) {
        return <Navigate to={'/'} replace/>
    }
    return children;
}