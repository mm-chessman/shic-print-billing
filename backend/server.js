const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const usersFilePath = "./users.json";

const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to users file:', error);
    }
};

app.get("/api/users", (req, res) => {
    const usersData = readUsersFromFile();
    res.json(usersData);
});

app.post("/add-user", (req, res) => {
    const newUser = req.body;
    const usersData = readUsersFromFile();
    usersData.push(newUser);
    writeUsersToFile(usersData);
    res.status(200).json({ message: "User added successfully" });
});

app.patch("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const usersData = readUsersFromFile();
    const userIndex = usersData.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    usersData[userIndex] = { ...usersData[userIndex], ...updatedUserData };
    writeUsersToFile(usersData);
    res.json(usersData[userIndex]);
});

app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const usersData = readUsersFromFile();
    const userIndex = usersData.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    usersData.splice(userIndex, 1);
    writeUsersToFile(usersData);
    res.json({ message: "User deleted successfully" });
});

app.get("/api/user/:id", (req, res) => {
    const userId = req.params.id;
    const usersData = readUsersFromFile();
    const user = usersData.find(user => user.id === userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const combinedTransactions = [...(user.debt || []), ...(user.credit || [])]
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    res.status(200).send({ ...user, transactions: combinedTransactions });
});

app.post("/api/user/:id/add-credit", (req, res) => {
    const userId = req.params.id;
    const newCredit = req.body;
    const usersData = readUsersFromFile();
    const user = usersData.find(user => user.id === userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    user.credit = user.credit || [];
    user.credit.push(newCredit);
    writeUsersToFile(usersData);
    res.status(200).send({ message: "Credit added successfully", user });
});

app.post("/api/user/:id/add-debt", (req, res) => {
    const userId = req.params.id;
    const newDebt = req.body;
    const usersData = readUsersFromFile();
    const user = usersData.find(user => user.id === userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    user.debt = user.debt || [];
    user.debt.push(newDebt);
    writeUsersToFile(usersData);
    res.status(200).send({ message: "Debt added successfully", user });
});

app.post('/bulk-import-users', (req, res) => {
    const newUsers = req.body;
    if (!Array.isArray(newUsers)) {
        return res.status(400).json({ message: 'Invalid data format' });
    }
    const usersData = readUsersFromFile();
    newUsers.forEach(user => {
        if (user.id && user.name) {
            usersData.push(user);
        }
    });
    writeUsersToFile(usersData);
    res.status(201).json({ message: 'Users imported successfully' });
});

app.post("/bulk-debt", (req, res) => {
    const { ids, newTransaction } = req.body;
    const usersData = readUsersFromFile();
    ids.forEach(userId => {
        const user = usersData.find(u => u.id === userId);
        if (user) {
            user.debt = user.debt || [];
            user.debt.push(newTransaction);
        }
    });
    writeUsersToFile(usersData);
    res.status(200).json({ message: "Debts added successfully" });
});

app.post('/bulk-credit', (req, res) => {
  const { excludedIds } = req.body;

  const usersData = readUsersFromFile();

  usersData.forEach(user => {
    if (!excludedIds.includes(user.id)) {
      const totalDebt = user.debt ? user.debt.reduce((acc, debt) => acc + debt.amount, 0) : 0;
      const totalCredit = user.credit ? user.credit.reduce((acc, credit) => acc + credit.amount, 0) : 0;
      const remainingDebt = totalDebt - totalCredit;

      if (remainingDebt > 0) {
        const newCredit = { amount: remainingDebt, date: new Date().toLocaleDateString() };
        user.credit = user.credit || [];
        user.credit.push(newCredit);
      }
    }
  });

  writeUsersToFile(usersData);

  res.status(200).send({ message: 'Credits added successfully' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
