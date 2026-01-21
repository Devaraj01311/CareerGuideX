const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");


const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "careerguidex/profile-images",
    resource_type: "image", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "careerguidex/resumes",
    resource_type: "raw",
    public_id: file.originalname.replace(/\.[^/.]+$/, ""),
  }),
});


const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
});

const uploadResumes = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

module.exports = {
  uploadProfile,
  uploadResumes,
};
