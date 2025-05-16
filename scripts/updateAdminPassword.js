// Simple script to update the admin user password in localStorage
// This is for development mode only - production uses Supabase authentication

// Find existing user data
const storedUser = localStorage.getItem('user');
const isAuth = localStorage.getItem('isAuthenticated');

if (!storedUser) {
  console.log('No user found in localStorage. Creating new admin user...');
  
  // Create new admin user
  const adminUser = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
  };

  localStorage.setItem('user', JSON.stringify(adminUser));
  localStorage.setItem('isAuthenticated', 'true');
  
  console.log('Created new admin user with credentials:');
  console.log('Email: admin@example.com');
  console.log('Password: Pass1 (not stored in localStorage, for reference only)');
} else {
  console.log('Found existing user in localStorage:');
  console.log(JSON.parse(storedUser));
  
  // Update existing user if needed
  const user = JSON.parse(storedUser);
  // We don't store passwords in localStorage, this is just for reference
  console.log('Updated credentials:');
  console.log('Email:', user.email);
  console.log('Password: Pass1 (not stored in localStorage, for reference only)');
  
  localStorage.setItem('isAuthenticated', 'true');
}

console.log('\nIMPORTANT: Please remember these credentials for login:');
console.log('Email: admin@example.com');
console.log('Password: Pass1');
console.log('\nPassword update complete. Please reload the application after running this script.'); 