import { Routes, Route } from "react-router-dom";

import Register from "./Register";
import OnboardingPage from "./OnboardingPage";
import VerifyAccount from "./VerifyAccount";
import Login from "./Login";
import OnboardingReview from "./OnboardingReview";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="verify-account" element={<VerifyAccount />} />
            <Route path="onboarding-review" element={<OnboardingReview />} />
        </Routes>
    );
};

export default AuthRoutes;
