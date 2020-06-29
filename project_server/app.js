require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('./src/tokens.js');
const { isAuth } = require('./src/isAuth.js');
// database 
const db = require('./src/database.js');
// pdf Generator
const { generatePDF } = require('./src/pdfGenerator.js');
const path = require('path');
const { sendErrorMsg } = require('./src/error.js');
const logger = require('morgan');

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const app = express();

app.use(logger('dev'));

// Use express middleware for easier cookie handling
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  }),
);

// Needed to be able to read body data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// 1. Register a user
app.post('/register', async (req, res) => {
  const [email, password] = [req.body.email, req.body.password];

  try {
    // 1. Check if the user exist
    let user = await db.findUser(email);
    if (user) throw new Error('User already exist');
    // 2. If not user exist already, hash the password
    req.body.password = await hash(password, 10);
    // 3. Insert the user in "database"
    user = await db.addUser(req.body);
    if (!user) throw new Error('Database error');
    res.send({ msg: 'Benutzer erstellt' });
    console.log('User Created');
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

// 2. Login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user in array. If not exist send error
    let user = await db.findUser(email);
    if (!user) throw new Error('User does not exist');
    // 2. Compare crypted password and see if it checks out. Send error if not
    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Password not correct');
    // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user);
    const refreshtoken = createRefreshToken(user.id);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    user = await db.setToken(user.id, refreshtoken);
    if (!user) throw new Error('Database error');
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

// 3. Logout a user
app.post('/logout', (_req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  // Logic here for also remove refreshtoken from db
  return res.send({
    message: 'Logged out',
  });
});

// 4. Get a new access token with a refresh token
app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.refreshtoken;
  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: '' });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }
  // token is valid, check if user exist
  let user = await db.findUserByID(payload.userId);
  if (!user) return res.send({ accesstoken: '' });
  // user exist, check if refreshtoken exist on user
  if (user.refresh_token !== token)
    return res.send({ accesstoken: '' });
  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user = await db.setToken(user.id, refreshtoken);
  if (!user) throw new Error('Database error');
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
});

// 5. Submit a form 
app.post('/form', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const [form, doc] = await db.addForm(req.body);
      if (!form || !doc) throw new Error('Database error');
      res.send({
        msg: "Abgesandt"
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

app.post('/form2/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const [form2, doc] = await db.addForm2(req.body, req.params.id);
      if (!form2 || !doc) throw new Error('Database error');
      res.send({
        msg: "Abgesandt"
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

app.put('/form/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const [form, doc] = await db.updateForm(req.body, req.params.id);
      if (!form || !doc) throw new Error('Database error');
      res.send({
        msg: "Geändert"
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

app.put('/form2/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const form2 = await db.updateForm2(req.body, req.params.id);
      if (!form2) throw new Error('Database error');
      res.send({
        msg: "Geändert"
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

// 6. Get all the docs
app.get('/get_docs/:currentPage', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const result = await db.getAllDocs(req.params.currentPage)
      res.send(result);
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

// 7. Generate a pdf file 
app.post('/generate/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const id = req.params.id
      const [form, form2] = await db.getDoc(id);
      console.log("Generating...");
      generatePDF(id, form, form2);
      console.log("Generated");
      res.send({
        msg: "Erzeugt",
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

// 8. Download a pdf file 
app.get('/download/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const file = req.params.id + '.pdf';
      const filePath = path.join('./documents', file);
      res.download(filePath, file); // Set disposition and send it.
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

//9. Get a form 
app.get('/form/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const form = await db.findForm(req.params.id);
      if (!form) throw new Error('Database error');
      res.send(form);
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

app.get('/form2/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const form = await db.findForm2(req.params.id);
      if (!form) throw new Error('Database error');
      res.send(form);
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

//10. Delete a doc
app.delete('/doc/:id', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const doc = await db.deleteDoc(req.params.id);
      if (!doc) throw new Error('Database error');
      res.send({
        msg: "Gelöscht"
      });
    }
  } catch (err) {
    sendErrorMsg(res, err.message);
  }
});

module.exports = app;