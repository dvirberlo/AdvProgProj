const mongoose = require("mongoose");

const httpHeaders = require("../constants/httpHeaders");

const { Category } = require("../models/categoryModel");
const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const Watch = require("../models/watchModel");

const models = [Category, Movie, User, Watch];

/**
 * A script to initialize some mock data to make manual testing easier and faster.
 * Note: this script delete the entire content of mongoDB. please delete user_data.txt and restart recommend server.
 * Usage: cd ./src/web-server && node ./scripts/init.js
 */
const init = async () => {
  // setup mongo
  require("custom-env").env(process.env.NODE_ENV ?? "local", "./config");
  await mongoose.connect(process.env.CONNECTION_STRING);

  // clean DB
  for (const model of models) await model.deleteMany({});

  // users
  const users = [
    {
      firstName: "David",
      lastName: "Black",
      username: "david",
      password: "david123",
      image: undefined,
    },
    {
      firstName: "Zvi",
      lastName: "Berger",
      username: "zvi",
      password: "zvi123",
      image: undefined,
    },
    {
      firstName: "BigBigTrouble",
      lastName: "MoHaHaHaHaHaHaHaHa",
      username: "trouble-trouble-trouble",
      password: "it_come_in_triplets",
      image: "https://robohash.org/trouble.png",
    },
  ];
  for (const user of users) {
    Object.assign(
      user,
      await (
        await fetch(`http://localhost:${process.env.PORT}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
      ).json()
    );
  }

  // categories
  const categories = [
    {
      name: "Adventure",
      promoted: true,
    },
    {
      name: "Drama",
      promoted: true,
    },
    {
      name: "Animated",
      promoted: true,
    },
    {
      name: "Action",
      promoted: undefined,
    },
    {
      name: "Children",
      promoted: false,
    },
  ];
  for (const category of categories) {
    Object.assign(
      category,
      await (
        await fetch(`http://localhost:${process.env.PORT}/api/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        })
      ).json()
    );
  }
  // movies
  const movies = [
    {
      name: "Indiana Jones and the Last Crusade",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[0]._id, categories[3]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "Toy Story",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[2]._id, categories[4]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "Die Hard",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[3]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "The Lion King",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[2]._id, categories[4]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "The Dark Knight",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[3]._id, categories[1]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "The Avengers",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[0]._id, categories[3]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
    {
      name: "Frozen",
      description: "blah",
      length: 90,
      rating: 4,
      categories: [categories[2]._id, categories[4]._id],
      releaseYear: 1999,
      filePath: "filePath1",
      thumbnailPath: "thumbnailPath2",
    },
  ];
  for (const movie of movies) {
    Object.assign(
      movie,
      await (
        await fetch(`http://localhost:${process.env.PORT}/api/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        })
      ).json()
    );
  }

  // watches
  const watches = [
    {
      watcher: users[0]._id,
      movie: movies[0]._id,
    },
    {
      watcher: users[0]._id,
      movie: movies[1]._id,
    },
    {
      watcher: users[0]._id,
      movie: movies[4]._id,
    },
    {
      watcher: users[1]._id,
      movie: movies[0]._id,
    },
    {
      watcher: users[2]._id,
      movie: movies[0]._id,
    },
    {
      watcher: users[2]._id,
      movie: movies[3]._id,
    },
    {
      watcher: users[2]._id,
      movie: movies[5]._id,
    },
  ];
  for (const watch of watches) {
    Object.assign(
      watch,
      await (
        await fetch(
          `http://localhost:${process.env.PORT}/api/movies/${watch.movie}/recommend`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              [httpHeaders.TOKEN_ID_HEADER]: watch.watcher,
            },
          }
        )
      ).json()
    );
  }

  console.log({ users, categories, movies, watches });

  // close connection and exit
  await mongoose.connection.close();
};

init();
