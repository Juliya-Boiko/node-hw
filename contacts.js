const fs = require('fs').promises;
const path = require('path');
const ShortUniqueId = require('short-unique-id');

const filePath = path.join(__dirname, 'db/contacts.json');
const uid = new ShortUniqueId({ length: 10 });

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  if (name === '' || email === '' || phone === '') {
    console.log('All fields must be filled!!!');
    return;
  }
  const newContact = {
    id: uid(),
    name: name,
    email: email,
    phone: phone
  };
  contacts.push(newContact);
  fs.writeFile(filePath, JSON.stringify(contacts));
  console.log(`New contact: ${name} was added`);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item => item.id === contactId));
  if (index === -1) {
    return null;
  }
  const removedItem = contacts[index];
  contacts.splice(index, 1);
  fs.writeFile(filePath, JSON.stringify(contacts));
  return removedItem;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
};











//const all = fs.readFile('db/contacts.json').then(data => console.log(JSON.parse(data))).catch(error => console.log(error.message));

// const contactsOperations = async(filePath, action = 'read', value = '') => {
//   switch(action) {
//     case 'read' : 
//       const data = await fs.readFile(filePath);
//       console.log(JSON.parse(data));
//       break;
//     case 'add':
//       await fs.appendFile(filePath, value);
//       break;
//     default:
//       console.log('Default CASE!!!!!!');
//   }
// };

// contactsOperations('db/contacts.json');