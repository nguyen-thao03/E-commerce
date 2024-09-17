const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCodeModel");

// create coupoun code
router.post(
  "/create-coupoun-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Đã có mã giảm giá!", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupousns of a shop
router.get(
  "/get-coupoun/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupounCodes = await CoupounCode.find({ shopId: req.seller.id });
      
      res.status(201).json({
        success: true,
        coupounCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupoun/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupounCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!coupounCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Xóa mã giảm giá thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupoun-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupounCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
