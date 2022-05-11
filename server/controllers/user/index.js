const { user, trip } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const { id, email, accessToken } = validity;
        const userInfo = await user.findOne({
          where: { id, email },
        });
        const trips = await trip.findAll({
          where: { user_id: id },
        });
        const num_trips = trips.length;

        const data = {
          email,
          nickname: userInfo.nickname,
          num_trips,
        };
        await slack.slack("User Get 200", `id : ${id}`);
        res.status(200).send({ data, accessToken });
      }
    } catch (err) {
      await slack.slack("User Get 501");
      res.status(501).send("User Get");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const userInfo = await user.findOne({
          where: {
            email: req.body.email,
            password: req.body.password,
          },
        });
        if (!userInfo) {
          await slack.slack("User Patch 404", `id : ${validity.id}`);
          res.status(404).send({
            data: { id: validity.id },
            message: "No User",
          });
        }
        await user.update({ password: req.body.new_password }, { where: { id: userInfo.id } });
        await slack.slack("User Patch 200", `id : ${userInfo.id}`);
        res.status(200).send({ data: { id: userInfo.id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("User Patch 501");
      res.status(501).send("User Patch");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      console.log(validity);
      if (validity) {
        await user.destroy({
          where: { id: validity.id },
        });
        console.log(22222222);
        await slack.slack("User Delete 200", `id : ${validity.id}`);
        res.status(200).send({ data: validity.id });
      }
    } catch (err) {
      await slack.slack("User Delete 501");
      res.status(501).send("User Delete");
    }
  },
};
