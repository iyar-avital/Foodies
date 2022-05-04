// Manage access
is_admin = (user) => user.role == 'manager';
is_emplyoee = (user) => user.role == 'employee';
is_client = (user) => user.role == 'client';
is_staff = (user) => is_admin(user) || is_emplyoee(user);

module.exports = {
    is_admin,
    is_emplyoee,
    is_client,
    is_staff
}