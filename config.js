'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://dev:1234123412@fyt-ugeik.mongodb.net/test?retryWrites=true';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
