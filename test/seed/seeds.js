let postSeed = {
    'name': 'MochaTestUser',
    'email': 'art@mochatesting.com',
    'dob': '1994-01-16',
    'department': 'Testing',
    'gender': 'Other',
    'age': '23 years and 26 days'
}

let putSeed = {
    'email': 'art@mochatesting.com',
    'update': {
        'department': 'newTesting'
    }
}

let deleteSeed = {
    'email': 'art@mochatesting.com'
}

module.exports = {
    postSeed,
    putSeed,
    deleteSeed
};