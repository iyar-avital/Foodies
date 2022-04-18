// Manage access
is_admin = (user) => user.role == 'manager';
is_emplyoee = (user) => user.role == 'employee';
is_client = (user) => user.role == 'client';

module.exports = {
    is_admin,
    is_emplyoee,
    is_client
}