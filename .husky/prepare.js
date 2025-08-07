const { execSync } = require('child_process');

if (process.env.CI === 'true' || process.env.VERCEL === '1') {
    console.log('CI/Vercel environment detected, skipping husky install');
    process.exit(0);
}

try {
    execSync('husky install', { stdio: 'inherit' });
} catch (error) {
    console.warn('Failed to install husky hooks:', error);
    process.exit(0);
}