// Navigation
user_view_navigation = { 'id': 'users', 'href': '#users', 'url': '/users', 'text': 'Users' };
flowers_catalog_navigation = { 'id': 'flowers', 'href': '#flowers', 'url': '/flowers', 'text': 'Flowers' };
about_us_page_navigation = { 'id': 'about_us', 'href': '#about_us', 'url': '/about_us', 'text': 'About Us' };
contact_us_page_navigation = { 'id': 'contact_us', 'href': '#contact_us', 'url': '/contact_us', 'text': 'Contact Us' };

const getDefaultNav = () => {
    return [
        about_us_page_navigation,
        contact_us_page_navigation
    ];
}

const getClientNav = () => {
    return [
        flowers_catalog_navigation,
        about_us_page_navigation,
        contact_us_page_navigation
    ];
}

const getAdminTeamNav = () => {
    return [
        user_view_navigation,
        flowers_catalog_navigation,
        about_us_page_navigation,
        contact_us_page_navigation
    ];
}

module.exports = {
    getDefaultNav,
    getClientNav,
    getAdminTeamNav
};