
const User = require('../Schema/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

const register = async (req, res) => {
    try {
        const { username, email, password, gender, id, role, subject } = req.body
        const find = await User.findOne({ id })
        if (find) {
            res.status(400).json({ error: "User already exists" })
        }
        else if (username && email && password && id && role && subject && gender) {
            const hash = await bcrypt.hash(password, 10)
            const user = await User.create({ username, email, gender, id, role, subject, password: hash })
            try {
                const transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    }

                })
                console.log(process.env.GMAIL_USER, process.env.GMAIL_PASS)
                const mailOptions = {
                    from: process.env.GMAIL_USER,
                    to: email,
                    subject: 'Welcome to your Institute portal.',
                    html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    background-color: lightblue;
                                    font-family: Arial, sans-serif;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #ffffff;
                                    border-radius: 5px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    color: #333333;
                                }
                                p {
                                    color: #555555;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Greetings for you new Portal.</h1>
                                <p>Thank you for signing up! We appreciate your interest.</p>
                            </div>
                        </body>
                    </html>
                `,
                }
                const mail = await transporter.sendMail(mailOptions)
                res.status(200).json({ message: "This user has been registered and notified through through their mail.", User: { user, mail } })
            } catch (err) {
                res.status(500).json({ err: err.message })

            }
        }
        else {
            res.status(400).json({ error: "Please provide all required fields" })
        }
    }

    catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { id, password } = req.body
        if (id && password) {
            const find = await User.findOne({ id })
            if (find) {
                const decryptpassword = await bcrypt.compare(password, find.password)
                if (decryptpassword) {
                    const token = jwt.sign({ id: find.id }, process.env.JWT)
                    res.status(200).json({ message: "You have been logged in.", token })
                }
                else {
                    res.status(400).json({ error: "Please provide correct password" })
                }
            }
            else {
                res.status(400).json({ error: "This user doesnt exists, try again." })
            }
        }
        else {

            res.status(400).json({ error: "Please provide email and password" })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await User.find({ id })
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, password, newpassword } = req.body
        console.log(id, password, newpassword)
        if (id && password && newpassword) {
            const find = await User.findOne({ id })
            if (find) {
                const decryptpassword = await bcrypt.compare(password, find.password)
                if (decryptpassword) {
                    const hashed = await bcrypt.hash(newpassword, 10)
                    const user = await User.findOneAndUpdate({ id }, { password: hashed })
                    res.status(200).json({ message: "Your password has been updated.", user })
                }
            }
            else {
                res.status(400).json({ error: "This user doesnt exists, try again." })
            }
        }
        else {
            res.status(400).json({ error: "Please provide your correct old password" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        const find = await User.findOne({ id })
        if (!find) {
            res.status(400).json({ error: "This user doesnt exists, try again." })
        }
        else {
            const remove= await User.findOneAndDelete({ id })
            res.status(200).json({ meassge: 'Given user has been deleted.', ID: remove.id })
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, login, getUser, updateUser, deleteUser }   