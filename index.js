const path = require('path');
const operationsPath = path.join(__dirname, 'contacts.js');
const contactsOperations = require(operationsPath);

// const { Command } = require("commander");
// const program = new Command();
// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const argv = program.opts();

// // TODO: рефакторить
 async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      console.log(list);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;
    case "add":
      await contactsOperations.addContact(name, email, phone);
      break;
    case "remove":
      await contactsOperations.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type! DEFAULT ACTION");
  }
}

//invokeAction({ action: "list" });
//invokeAction({ action: 'get', id: 1 });
//invokeAction({ action: 'remove', id: 1 });
invokeAction({ action: 'add', name: 'Frodo', email: 'fr@mail.com', phone: '111111' })


// invokeAction(argv);