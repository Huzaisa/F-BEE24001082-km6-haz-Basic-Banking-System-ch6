const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Imagekit = require('../libs/imagekit');
const path = require('path');

module.exports = {

    addImage: async(req, res, next) => {
        try {
            let { judul, deskripsi } = req.body;
            let strFile = req.file.buffer.toString('base64');

            const { url } = await Imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile,
            });

            const image = await prisma.image.create({
                data: {
                    title: judul,
                    description: deskripsi,
                    imageUrl: url,
                },
            });

            if (!image) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request!',
                    err: err.message,
                    data: null,
                });
            }

            return res.status(201).json({
                status: true,
                message: 'Created!',
                err: null,
                data: { image },
            });
        } catch (err) {
            next(err);
        }
    },


    listImages: async(req, res, next) => {
        try {
            const images = await prisma.image.findMany();

            return res.status(200).json({
                status: true,
                message: 'Ok!',
                data: { images },
            });
        } catch (err) {
            next(err);
        }
    },


    detailImage: async(req, res, next) => {
        try {
            let { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            if (!image) {
                return res.status(404).json({
                    status: false,
                    message: 'Not Found!',
                    err: 'Image with id does not exist',
                    data: null,
                });
            }

            return res.status(200).json({
                status: true,
                message: 'Ok!',
                data: { image },
            });
        } catch (err) {
            next(err);
        }
    },


    deleteImage: async(req, res, next) => {
        try {
            const { id } = req.params;
            await prisma.image.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return res.status(200).json({
                status: true,
                message: 'Deleted image success!',
                data: null,
            });
        } catch (err) {
            next(err);
        }
    },


    updateImageInfo: async(req, res, next) => {
        try {
            let { id } = req.params;
            let { judul, deskripsi } = req.body;

            const image = await prisma.image.findUnique({ where: { id: parseInt(id) } });
            if (!image) {
                return res.status(404).json({
                    status: false,
                    message: 'Not Found!',
                    err: 'Image with id does not exist',
                    data: null,
                });
            }

            const updatedImage = await prisma.image.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    title: judul,
                    description: deskripsi,
                },
            });

            return res.status(200).json({
                status: true,
                message: 'Updated!',
                data: { image: updatedImage },
            });
        } catch (err) {
            next(err);
        }
    },
};