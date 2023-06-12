const { User } = require('../models');

const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);
// passwords for seed data will now be "password"

const userData = [
        {
            username: 'Jaredrjack',
            github: 'jaredrjack',
            email: 'jaredrjack93@@gmail.com',
            password: hash,
            bio: 'My name is Jared!'
          },
          {
            username: 'christina-j',
            github: 'chrissyj',
            email: 'cosmochris@icloud.com',
            password: hash,
            bio: 'My name is Christina'
          },
          {
            username: 'niyahj',
            github: 'niyahj',
            email: 'niyahj@gmail.com',
            password: hash,
            bio: 'My name is Niyah!'
          },
          {
            username: 'Neyojack',
            github: 'neyojack',
            email: 'neyojack@gmail.com',
            password: hash,
            bio: 'My name is Neyo!'
          },
          {
            username: 'judahAJ',
            github: 'judah30',
            email: 'judahAJ@gmail.com',
            password: hash,
            bio: 'My name is Judah!'
          },
          {
            username: 'ShawnK',
            github: 'ShawnK',
            email: 'shawn@gmail.com',
            password: hash,
            bio: 'My name is Shawn!'
          },
          {
            username: 'JoshRJ',
            github: 'Blacjac',
            email: 'Josj@gmail.com',
            password: hash,
            bio: 'My name is Josh!'
          },
        ];
        
        const seedUsers = () => User.bulkCreate(userData);
        
        module.exports = seedUsers;