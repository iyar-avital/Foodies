const User = require('./model')("Flower");
const prompt = require('./prompt');
const timeout = require('./timeout');

(async () => {
    console.clear();
    await timeout(500); while (true) {
        let flower = [];

        console.log();
        flower[0] = await prompt("Please enter name: ");
        flower[1] = await prompt('Please enter imageUrl: ');
        flower[2] = await prompt('Please enter color: ');
        flower[3] = await prompt('Please enter price: ');

        console.log(flower);

        try {
            await User.CREATE(flower);
            console.log('User created:' + flower);
        } catch (err) { throw err; }
    }
})();	