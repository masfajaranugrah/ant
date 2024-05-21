const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema(
    {
        name: {
            type: String,
            allowNull: false,
        },
        email: {
            type: String,
            allowNull: false,
            unique: true,
            validate: {
                validator: (value) => {
                    return value.match(/^[a-zA-Z0-9._%+-]+@ums.ac.id$/);
                },
                message: 'Please enter a valid @ums.ac.id email address'
            }
        },
        password: {
            type: String,
            allowNull: false
        },
        role: {
            type: String,
            default: 'admin'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }    },
    {
        timestamps: true
    }
);

const Administrator = mongoose.model('Administrator', userSchema);
module.exports = Administrator;