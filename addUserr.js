const User = require('./model')("User");
const prompt = require('./prompt');
const timeout = require('./timeout');

(async () => {
    console.clear();
    await timeout(500); while (true) {
        let user = [];


        console.log();
        user[0] = await prompt("Please enter username: ");
        user[1] = await prompt('Please enter pass: ');
        user[2] = await prompt('Please enter role: ');

        console.log(user);

        try {
            await User.CREATE(user);
            console.log('User created:' + user);
            await timeout(10000);
            await User.DELETE('dd');

        } catch (err) { throw err; }
    }
})();	