const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const UserModel = require('./db/user.js');
const FormModel = require('./db/form.js');
const Form2Model = require('./db/form2.js');
const DocModel = require('./db/doc.js');

const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'project';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false
    })
      .then(async () => {
        console.log('Database connection successful')
        // await this.addUser();
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }

  // User methods
  async addUser(userData) {    
    const user = await UserModel.create(userData);
    return user;
  }

  async findUser(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async findUserByID(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async setToken(id, refresh_token) {
    const user = await UserModel.findByIdAndUpdate(id, { refresh_token: refresh_token });
    return user;
  }

  // Form methods
  async addForm(formData) {    
    const form = await FormModel.create(formData);
    const doc = await DocModel.create({ form: form.id, substance_name: form.substance_name, applicant: form.applicant });
    return [form, doc];
  }

  async findForm(formID) {    
    const form = await FormModel.findById(formID);
    return form;
  }

  async updateForm(formData, docID) {    
    const doc = await DocModel.findByIdAndUpdate(docID, {
      substance_name: formData.substance_name, applicant: formData.applicant
    });
    const form = await FormModel.findByIdAndUpdate(doc.form, formData);
    return [form, doc];
  }

  //Form2 methods
  async addForm2(form2Data, docID) {    
    const form2 = await Form2Model.create(form2Data);
    const doc = await DocModel.findByIdAndUpdate(docID, {
      form2: form2.id, 
      isFilled: true
    });
    return [form2, doc];
  }

  async findForm2(form2ID) {    
    const form2 = await Form2Model.findById(form2ID);
    return form2;
  }

  async updateForm2(form2Data, form2ID) {    
    const form2 = await Form2Model.findByIdAndUpdate(form2ID, form2Data);
    return form2;
  }

  // Doc methods
  async getAllDocs(currentPage) {
    const result = await DocModel.paginate({}, { page: currentPage, limit: 3, sort: {date: 'descending'} }, (err, result) => result);
    return result;
  }

  async getDoc(docID) {
    const doc = await DocModel.findByIdAndUpdate(docID, {
      isGenerated: true
    });
    const form = await this.findForm(doc.form);
    const form2 = await this.findForm2(doc.form2);
    return [form, form2];
  }

  async deleteDoc(docID) {
    const doc = await DocModel.findByIdAndDelete(docID);
    if (doc.form) {
      await FormModel.findByIdAndDelete(doc.form);
      if (doc.form2) {
        await Form2Model.findByIdAndDelete(doc.form2);
        if (doc.isGenerated) {
          const file = docID + '.pdf';
          const filePath = path.join('./documents', file);
          try {
            fs.unlinkSync(filePath)
            //file removed
          } catch(err) {
            console.error(err)
          }
        }
      }
    }
    console.log(`Doc ${doc.id} deleted`)
    return doc;
  }
}

module.exports = new Database()