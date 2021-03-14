import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default {
  async findOne(req, res, next) {
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).send({ data: movie });
  },
  async findAll(req, res) {
    const allMovies = await prisma.movie.findMany();
    return res.status(200).send({ data: allMovies });
  },

  async create(req, res) {
    const movie = await prisma.movie.create({
      data: {
        tconst: req.body.tconst,
        titleType: req.body.titleType,
        primaryTitle: req.body.primaryTitle,
        originalTitle: req.body.originalTitle,
        isAdult:
          String(req.body.isAdult).toLowerCase() == "true" ? true : false,
        startYear: parseInt(req.body.startYear),
        endYear: req.body.endYear === null ? null : parseInt(req.body.endYear),
        runtimeMinutes:
          req.body.runtimeMinutes === null
            ? null
            : parseInt(req.body.runtimeMinutes),
        genres: req.body.genres,
      },
    });
    return res.status(201).send({ data: movie, message: `Movie was created` });
  },

  async update(req, res) {
    const movie = await prisma.movie.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        tconst: req.body.tconst,
        titleType: req.body.titleType,
        primaryTitle: req.body.primaryTitle,
        originalTitle: req.body.originalTitle,
        isAdult:
          String(req.body.isAdult).toLowerCase() == "true" ? true : false,
        startYear: parseInt(req.body.startYear),
        endYear: req.body.endYear === null ? null : parseInt(req.body.endYear),
        runtimeMinutes:
          req.body.runtimeMinutes === null
            ? null
            : parseInt(req.body.runtimeMinutes),
        genres: req.body.genres,
        primaryTitle: req.body.primaryTitle,
      },
    });
    return res.status(201).send({ data: movie, message: `Movie was updated` });
  },

  async delete(req, res) {
    await prisma.movie.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.status(200).send({ message: `Movie was removed` });
  },
};
