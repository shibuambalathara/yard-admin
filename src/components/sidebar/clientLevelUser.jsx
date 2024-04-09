 export const clientLevelUser = [
    {
        title: "Client Dashboard"
    },
    {
        title: "user1",
        icon: "",
        childrens: [
            {
                title: "Home",
                icon: "@",
                path: "/"
            },
            {
                title: "About",
                icon: "@",
                path: "/about"
            },
            {
                title: "Contact",
                icon: "@",
                childrens: [
                    {
                        title: "Facebook",
                        icon: "@"
                    },
                    {
                        title: "Twitter",
                        icon: "@"
                    },
                    {
                        title: "Instagram",
                        icon: "@"
                    }
                ]
            },
            {
                title: "FAQ",
                icon: "@"
            }
        ]
    },
    {
        title: "user2",
        icon: "@",
        childrens: [
            {
                title: "Login",
                path: "/login"
            },
            {
                title: "Register",
                path: "/register"
            },
            {
                title: "Forgot Password",
                path: "/forgot-password"
            },
            {
                title: "Reset Password",
                path: "/reset-password"
            }
        ]
    },
    {
        title: "user3",
        icon: "@",
        childrens: [
            {
                title: "Profile",
                path: "/profile"
            },
            {
                title: "Settings",
                childrens: [
                    {
                        title: "Account",
                        path: "/settings/account"
                    },
                    {
                        title: "Billing",
                        childrens: [
                            {
                                title: "Payment",
                                path: "/settings/billing/payment"
                            },
                            {
                                title: "Subscription",
                                path: "/settings/billing/subscription"
                            }
                        ]
                    },
                    {
                        title: "Notifications",
                        path: "/settings/notifications"
                    }
                ]
            },
            {
                title: "Logout",
                path: "/logout"
            }
        ]
    },
    {
        title: "user4",
        icon: "@",
        childrens: [
            {
                title: "Search",
                path: "/search"
            },
            {
                title: "History",
                path: "/history"   
            }
        ]
    },
    {
        title: "Support",
        icon: "@",
        path: "/support"
    },
    {
        title: "Report Bug",
        icon: "@",
        path: "/report-bug"
    }
];
