import { Routes, Route } from "react-router-dom";

import Register from "./Register";
import OnboardingPage from "./OnboardingPage";
import VerifyAccount from "./VerifyAccount";
import Login from "./Login";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="verify-account" element={<VerifyAccount />} />
            </Route>
        </Routes>
    );
};

export default AuthRoutes;
