const { listContacts, getContactById, removeContact, addContact } = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Contact list:");
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log("Your contact:");
        console.table([contact]);
      } else {
        console.log("Contact not found");
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("New contact added:");
      console.table([newContact]);
      break;

    case "remove":
      await removeContact(id);
      console.log("Contact removed.");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
