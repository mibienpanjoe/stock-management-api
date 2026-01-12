const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}/api/auth`;

const postRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const req = http.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        }, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
};

async function runTests() {
    console.log('--- Starting Auth Flow Verification ---');

    try {
        // 1. Register
        console.log('1. Testing Registration...');
        const regData = {
            fullname: 'Test User',
            email: `test_${Date.now()}@example.com`,
            password: 'Password123!',
            role: 'staff'
        };
        const regRes = await postRequest(`${BASE_URL}/register`, regData);
        console.log(`Registration Status: ${regRes.status}`);
        if (regRes.status !== 201) throw new Error('Registration failed');
        console.log('Registration Response:', regRes.body);

        // 2. Login
        console.log('\n2. Testing Login...');
        const loginData = {
            email: regData.email,
            password: regData.password
        };
        const loginRes = await postRequest(`${BASE_URL}/login`, loginData);
        console.log(`Login Status: ${loginRes.status}`);
        if (loginRes.status !== 200) throw new Error('Login failed');
        console.log('Login Token received:', !!loginRes.body.token);

        console.log('\n--- Auth Flow Verification Successful! ---');
    } catch (error) {
        console.error('\n--- Auth Flow Verification Failed! ---');
        console.error(error);
        process.exit(1);
    }
}

runTests();
