const Antrian = require('../models/antrian');
const User = require('../models/user');
const getAntrian = async (req, res) => {
    try {
        const data = await Antrian.find({}).populate('user');
        res.status(200).json({"message": "success get data", "data":data});
    } catch (err) {
        res.status(500).json({"message": err});
    }
}

const getDetail = async (req, res) => {
    const user = req.params.user; // Mengambil userID dari params
    const data = await Antrian.findOne({ user: user }).populate('user'); // Mencari antrian berdasarkan userID
    res.status(200).json({"message" : "success", "data":data})
 }

 const createAntrian = async (req, res) => {
    try {
        const { nomer_antrian, status, user } = req.body;
    
        // Membuat antrian baru dengan data yang diterima dari request
        const newAntrian = await Antrian.create({
            user, // Menggunakan ID pengguna yang telah terotentikasi
            nomer_antrian,
            status,
        });
        console.log(newAntrian)
        // Update array antrians di model User
        const a = await User.findByIdAndUpdate(user, { $push: { antrians: newAntrian._id } });
        console.log(a)
        res.status(200).json({ message: 'Antrian created successfully', data: newAntrian });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create antrian', error: error.message });
    }
};




// const updateAntrian = async (req, res) => {
//     const id = req.params._id;
//     const status = req.body.status;
//     console.log(id)
//     try {
//     const data = await Antrian.findById(id);
//     if(!data){
//         res.status(404).json({"message": "antrian tidak ditemukan"});
//     }
//     if (!req.body.status) {
//         return res.status(400).json({"message": "Status is required"});
//     }
   
//     const post = await Antrian.update({
//         status
//    })
//        res.status(200).json({"message": "success update data", data : post});
//     } catch (err) {
//         res.status(500).json({"message": err}); 
//     }
// }

const updateAntrian = async (req, res) => {
    try {
        // Pastikan ID valid sebelum mencari antrian
        const id = req.params._id;
        if (!id) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        // Cari antrian berdasarkan ID
        const antrian = await Antrian.findById(id);
        if (!antrian) {
            return res.status(404).json({ message: 'Antrian not found' });
        }

        // Validasi input status
        const status = req.body.status;
        console.log(status)
        if (typeof status !== 'string') {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Update status antrian
        antrian.status = status;

        // Simpan perubahan dan tanggapi dengan data yang diperbarui
        const updatedAntrian = await antrian.save();
        res.status(200).json({ message: 'Update success', data: updatedAntrian });
    } catch (error) {
        // Tanggapi dengan kesalahan yang disematkan
        res.status(500).json({ message: 'Failure', error: error.message });
    }
};

const deleteAntrian = async (req, res) => {
    try {
        // Pastikan ID valid sebelum mencari antrian
        const _id = req.params._id;
        // if (!id) {
        //     return res.status(400).json({ message: 'Invalid ID' });
        // }

        // // Cari antrian berdasarkan ID
        const antrian = await Antrian.findById(_id);
        console.log(antrian)
        // if (!antrian) {
        //     return res.status(404).json({ message: 'Antrian not found' });
        // }

        // // Hapus antrian
        // await antrian.remove();

        // res.status(200).json({ message: 'Antrian deleted successfully' });
    } catch (error) {
        // Tanggapi dengan kesalahan yang disematkan
        res.status(500).json({ message: 'Failure', error: error.message });
    }
};

module.exports = {
    getAntrian,
    getDetail,
    createAntrian,
    updateAntrian,
    deleteAntrian
};