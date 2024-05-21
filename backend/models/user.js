const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema(
    {
        name: {
            type: String,
            allowNull: false,
        },
        nim: {
            type: String,
            allowNull: false
        },
        phone_number: {
            type: String,
            allowNull: false
        },
        email: {
            type: String,
            allowNull: false,
            unique: true,
            validate: {
                validator: (value) => {
                    return value.match(/^[a-zA-Z0-9._%+-]+@student.ums.ac.id$/);
                },
                message: 'Please enter a valid @student.ums.ac.id email address'
            }
        },
        password: {
            type: String,
            allowNull: false
        },
        role: {
            type: String,
            default: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        antrians: [{ type: mongoose.Types.ObjectId, ref: 'Antrian' }] // Menambahkan field untuk menyimpan antrian yang dimiliki oleh pengguna
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;