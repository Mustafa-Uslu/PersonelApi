"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require('../models/department')


module.exports = {
    list: async (req, res) => {

        const result = await res.getModelList(Department);

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Department),
            result,
        });
    },

    create: async (req, res) => {

        //todo check if there is a lead, if it is there make old user lead fieldname false 

        const result = await Department.create(req.body);

        res.status(201).send({
            error: false,
            result,
        });
    },

    read: async (req, res) => {
        const result = await Department.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result,
        });
    },

    //filter, update,options
    // const options = { upsert: true };
    // acknowledged: İşlemin MongoDB tarafından tanındığını gösterir.
    // matchedCount: Filtre kriterleriyle eşleşen belge sayısını belirtir.
    // modifiedCount: Güncellenen belge sayısını belirtir.
    // upsertedId: Eğer upsert kullanıldıysa ve yeni bir belge oluşturulduysa, bu belgenin _id değeri burada yer alır.
    // upsertedCount: upsert işlemi ile kaç belgenin oluşturulduğunu belirtir.

    update: async (req, res) => {
        const result = await Department.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            result,
            new: await Department.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {

        //todo if a lead is deleted assign new lead to this department

        const result = await Department.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result,
        });
    },

    personnels: async (req, res) => {
        const Personnel = require('../models/personnel')

        // const result = await Personnel.find({ departmentId: req.params.id }).populate('departmentId')

        const result = await res.getModelList(Personnel, { departmentId: req.params.id }, 'departmentId')

        res.status(202).send({
            error: false,
            result
        })

    }

    //todo multi delete



};