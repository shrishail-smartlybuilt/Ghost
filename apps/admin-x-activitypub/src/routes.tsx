import Error from '@components/layout/Error';
import Explore from '@views/Explore';
import Feed from './views/Feed/Feed';
import Inbox from '@views/Inbox';
import Note from './views/Feed/Note';
import Notifications from '@views/Notifications';
import Onboarding from '@components/layout/Onboarding';
import OnboardingStep1 from '@components/layout/Onboarding/Step1';
import OnboardingStep2 from '@components/layout/Onboarding/Step2';
import OnboardingStep3 from '@components/layout/Onboarding/Step3';
import Profile from '@views/Profile';
import {Navigate, RouteObject} from '@tryghost/admin-x-framework';

export const APP_ROUTE_PREFIX = '/activitypub';

export type CustomRouteObject = RouteObject & {
    pageTitle?: string;
    children?: CustomRouteObject[];
};

export const routes: CustomRouteObject[] = [
    {
        // Root route configuration
        path: '',
        errorElement: <Error />, // This will catch all errors in child routes
        children: [
            {
                path: '/',
                element: <Navigate to="inbox" />,
                pageTitle: 'Home'
            },
            {
                path: 'inbox',
                element: <Inbox />,
                pageTitle: 'Inbox'
            },
            {
                path: 'inbox/:postId',
                element: <Inbox />,
                pageTitle: 'Inbox'
            },
            {
                path: 'feed',
                element: <Feed />,
                pageTitle: 'Feed'
            },
            {
                path: 'feed/:postId',
                element: <Note />,
                pageTitle: 'Note'
            },
            {
                path: 'notifications',
                element: <Notifications />,
                pageTitle: 'Notifications'
            },
            {
                path: 'explore',
                element: <Explore />,
                pageTitle: 'Explore'
            },
            {
                path: 'profile',
                element: <Profile />,
                pageTitle: 'Profile'
            },
            {
                path: 'profile/:handle',
                element: <Profile />,
                pageTitle: 'Profile'
            },
            {
                path: 'welcome',
                element: <Onboarding />,
                pageTitle: 'Welcome',
                children: [
                    {
                        path: '',
                        element: <Navigate to="1" replace />,
                        pageTitle: 'Welcome Start'
                    },
                    {
                        path: '1',
                        element: <OnboardingStep1 />,
                        pageTitle: 'Welcome Step1'
                    },
                    {
                        path: '2',
                        element: <OnboardingStep2 />,
                        pageTitle: 'Welcome Step2'
                    },
                    {
                        path: '3',
                        element: <OnboardingStep3 />,
                        pageTitle: 'Welcome Step3'
                    },
                    {
                        path: '*',
                        element: <Navigate to="1" replace />,
                        pageTitle: 'Welcome Step*'
                    }
                ]
            },
            {
                path: '*',
                element: <Error />,
                pageTitle: 'Generic Error'
            }
        ]
    }
];
