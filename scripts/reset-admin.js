
// Script to reset admin password in localStorage
// For development mode use only

console.log('Resetting admin account in localStorage...');

// Create admin user
const adminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
  permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
};

// Set in localStorage
localStorage.setItem('user', JSON.stringify(adminUser));
localStorage.setItem('isAuthenticated', 'true');

console.log('Admin account reset successfully!');
console.log('Login credentials:');
console.log('Email: admin@example.com');
console.log('Password: Pass1');
console.log('Please refresh the application to see changes.');
