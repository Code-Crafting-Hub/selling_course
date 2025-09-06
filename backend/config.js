require('dotenv').config()

const jwtUserPassword = process.env.JWT_USER_PASSWORD
const jwtAdminPassword = process.env.JWT_ADMIN_PASSWORD

module.exports = {jwtUserPassword, jwtAdminPassword}