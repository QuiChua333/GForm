import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ForgotPasswordPage, SignInPage, SignUpPage } from '../pages';
import { AuthLayout, MainLayout } from '../layouts';
import EmailVerificationPage from '../pages/EmailVerification';
import EmailVerificationResultPage from '../pages/EmailVerificationResult';

const pages = [
    {
        path: '/signin',
        page: SignInPage,
        layout: AuthLayout,
    },
    {
        path: '/signup',
        page: SignUpPage,
        layout: AuthLayout,
    },
    {
        path: '/email-verification',
        page: EmailVerificationPage,
        layout: AuthLayout,
    },
    {
        path: '/email-verification-result/:tokenLink',
        page: EmailVerificationResultPage,
        layout: AuthLayout,
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        layout: AuthLayout,
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: pages.map((page) => {
            const Layout = page.layout;
            const Page = page.page;
            return {
                path: page.path,
                element: (
                    <Layout>
                        <Page />
                    </Layout>
                ),
            };
        }),
    },
]);
export default router;
