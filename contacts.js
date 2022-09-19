const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => +item.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const refreshedContacts = contacts.filter(item => +item.id !== contactId);
  //console.log(refreshedContacts);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  contacts.push({ id: `${contacts.length + 1}`, name: name, email: email, phone: phone });
  //console.log(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
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