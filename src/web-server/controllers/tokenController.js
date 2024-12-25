const express = require("express");
const mongoose = require("mongoose");

const TokenService = require("../services/tokenService");

/**
 * send the user id based on the specified username and password in request's body
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getToken = async (req, res) => {
  try {
    const userId = await TokenService.getToken(
      req.body.username,
      req.body.password
    );
    if (userId == null)
      return res
        .status(400)
        .json({ error: "The specified credentials are invalid" });
    return res.status(200).json({ _id: userId });
  } catch (error) {
    console.error("tokenController: getToken internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getToken,
};
