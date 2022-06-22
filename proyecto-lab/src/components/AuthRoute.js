
import {Route, Redirect} from "react-router-dom";
import {httpGet} from "../utils/httpFunctions";
import {useEffect, useState} from "react";


const AuthRoute = ({exact, children, path}) => {

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        httpGet('api/me/').then((res) => {
            setIsLoggedIn(true)
            setLoading(false)
        }).catch((error) => {
            setIsLoggedIn(false)
            setLoading(false)
        })
    },[])

    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isLoggedIn || loading? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
};

export default AuthRoute