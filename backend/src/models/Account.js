import mongoose from 'mongoose';

// create a schema, then models it

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
{ timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);
export default Account;