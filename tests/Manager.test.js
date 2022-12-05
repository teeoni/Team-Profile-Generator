// using Manager constructor 
const Manager = require('../lib/Manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Tony', 31, 'test@gmail.com', 6);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Tony', 31, 'test@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 