const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user to login // is route correct for login "page" to be on home page?
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email. Please try again.' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password. Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'Successful login.' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user to logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;