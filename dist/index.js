"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware to parse JSON
app.use(express_1.default.json());
// Root endpoint for simple check
app.get('/', (req, res) => {
    res.send('API is running!');
});
// Endpoint to get all users from the database
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users); // Sends JSON response
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
}));
// Endpoint to create a new user
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Check if name, email, and password are provided
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Name, email, and password are required' });
        return;
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        // Check if email already exists
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }
        // Create new user in the database
        const newUser = yield prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
    }
}));
// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
// Gracefully shut down the Prisma client
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log('Prisma client disconnected');
    process.exit();
}));
