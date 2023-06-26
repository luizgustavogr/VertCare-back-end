const express = require('express');
const admin = require('firebase-admin');

// Configurações do Firebase
const serviceAccount = require('./thorp.json'); // Caminho para o arquivo de chave do serviço do Firebase
const { Timestamp } = require('@google-cloud/firestore');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const listRef = db.collection('list');
const usersRef = db.collection('users');

const app = express();
const PORT = 3001;

async function getUser (doc_id){
  const docRef = db.collection('users').doc(doc_id);

  return await docRef.get()
  .then((doc) => {
    if(doc.exists){
      return doc.data().nome;
    }
    else {
      console.log('nao foi possivel imprimir');
      return null;
    };
  })
  .catch((error) =>{
    console.log(error);
    throw error;
  });
};

const print = await getUser('123456');
console.log(print);

const slots = [
  slot1 = true,
  slot2 = false,
  slot3 = true,
  slot4 = false,
  slot5 = false,
  slot6 = false
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Running...');
});


app.post('/add_item', (req, res) => {
  const item = req.body.item; // criar junto com a quantidade ex: { "cebolinha":{"quantity": 3}}
  const doc_id = req.body.doc_id;
  const new_item = {
    item,
    set_slots,
  }

  listRef
    .doc(doc_id)
    .set(new_item)
    .then(() => {
      console.log(item);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error adding item:', error);
      res.status(500).send('Error adding item');
    });
    
});

app.post('/edit_quantity', (req, res) => {
  const item = req.body.item;
  const doc_id = req.body.doc_id;

  listRef
    .doc(doc_id)
    .update(item)
    .then(() => {
      console.log(item);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error adding item:', error);
      res.status(500).send('Error adding item');
    });
});

app.post('/edit_user', (req, res) => {
  const cpf = req.body.cpf;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const doc_id = req.body.doc_id;

  const new_data = {
    cpf: cpf,
    name: name,
    email: email,
    password: password
  }

  usersRef
    .doc(doc_id)
    .set(new_data)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error adding item:', error);
      res.status(500).send('Error adding item');
    });
});
