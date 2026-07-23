interface userI{
    id: number,
    name: string,
    type: userTypeE,
    age: number,
    balance: number
}


enum userTypeE {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN",
    MANAGER ="MANAGER",
}

type groupByTypeI = {
    [userTypeE.CLIENT]: userI[];
    [userTypeE.ADMIN]: userI[];
    [userTypeE.MANAGER]:userI[]

};


const users:userI[] = [
    { id: 1, name: "John", type: userTypeE.CLIENT, age: 21, balance: 500 },
    { id: 2, name: "Alex", type: userTypeE.ADMIN, age: 30, balance: 1200 },
    { id: 3, name: "Kate", type: userTypeE.CLIENT, age: 18, balance: 700 },
    { id: 4, name: "Mike", type: userTypeE.MANAGER, age: 27, balance: 900 }
];


// ======================= CREATE =======================

function addUser(user:userI) {
    users.push(user);
}

// ======================== READ =========================

function getAllUsers() {
    return users;
}

function getUser(id:number) {
    return users.find(user => user.id === id);
}

// ======================= UPDATE ========================

function updateName(id:number, name:string) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    user.name = name;

    return true;
}

function updateAge(id:number, age:number) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    user.age = age;

    return true;
}

function updateBalance(id:number, balance:number) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    user.balance = balance;

    return true;
}

function increaseBalance(id:number, amount:number) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    user.balance += amount;

    return true;
}

function decreaseBalance(id:number, amount:number) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    if (user.balance < amount) return false;

    user.balance -= amount;

    return true;
}

function changeType(id:number, type:userTypeE) {
    const user = users.find(user => user.id === id);

    if (!user) return false;

    user.type = type;

    return true;
}

// ======================= DELETE ========================

function removeUser(id:number) {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) return false;

    users.splice(index, 1);

    return true;
}

// ======================= FILTER ========================

function getClients() {
    return users.filter(user => user.type === userTypeE.CLIENT);
}

function getAdmins() {
    return users.filter(user => user.type === userTypeE.ADMIN);
}

function getManagers() {
    return users.filter(user => user.type === userTypeE.MANAGER);
}

function getAdults() {
    return users.filter(user => user.age >= 18);
}

function getRichUsers(minBalance:number) {
    return users.filter(user => user.balance >= minBalance);
}

// ======================== SEARCH =======================

function findByName(name:string) {
    return users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );
}

function findByType(type:userTypeE) {
    return users.filter(user => user.type === type);
}

// ========================= SORT ========================

function sortByAge() {
    return [...users].sort((a, b) => a.age - b.age);
}

function sortByBalance() {
    return [...users].sort((a, b) => b.balance - a.balance);
}

function sortByName() {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
}

// ====================== STATISTICS =====================

function getTotalBalance() {
    return users.reduce((sum, user) => sum + user.balance, 0);
}

function getAverageAge() {
    return (
        users.reduce((sum, user) => sum + user.age, 0) /
        users.length
    );
}

function getAverageBalance() {
    return (
        users.reduce((sum, user) => sum + user.balance, 0) /
        users.length
    );
}

function getOldestUser() {
    return users.reduce((oldest, user) =>
        user.age > oldest.age ? user : oldest
    );
}

function getYoungestUser() {
    return users.reduce((youngest, user) =>
        user.age < youngest.age ? user : youngest
    );
}

function getRichestUser() {
    return users.reduce((richest, user) =>
        user.balance > richest.balance ? user : richest
    );
}

function countByType(type:userTypeE) {
    return users.filter(user => user.type === type).length;
}

function getStatistics() {
    return {
        totalUsers: users.length,
        clients: countByType(userTypeE.CLIENT),
        admins: countByType(userTypeE.ADMIN),
        managers: countByType(userTypeE.MANAGER),
        totalBalance: getTotalBalance(),
        averageAge: getAverageAge(),
        averageBalance: getAverageBalance()
    };
}

// ====================== OPERATIONS =====================

function transferMoney(fromId:number, toId:number, amount:number) {
    const from = users.find(user => user.id === fromId);
    const to = users.find(user => user.id === toId);

    if (!from || !to) return false;

    if (from.balance < amount) return false;

    from.balance -= amount;
    to.balance += amount;

    return true;
}

function resetBalances() {
    users.forEach(user => {
        user.balance = 0;
    });
}

function removeClients() {
    for (let i = users.length - 1; i >= 0; i--) {
        if (users[i].type === userTypeE.CLIENT) {
            users.splice(i, 1);
        }
    }
}

function groupByType() {
    return users.reduce((groups: groupByTypeI, user) => {
        
        if (!groups[user.type]) {
            groups[user.type] = [];
        }

        groups[user.type].push(user);

        return groups;
    }, {} as groupByTypeI);
}

// ======================= EXAMPLES ======================

