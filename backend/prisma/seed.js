const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const fsPromises = require("fs/promises");

const path = require("path");
const parse = require("csv-parse");
const fetch = require("node-fetch");
const zlib = require("zlib");

async function downloadFile(url, path) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function main() {
  const filePath = path.join(__dirname, "..", "title.basics.tsv.gz");

  await fsPromises
    .stat(filePath)
    .then((stats) => {
      return fsPromises.unlink(filePath);
    })
    .catch();

  await downloadFile(
    "https://datasets.imdbws.com/title.basics.tsv.gz",
    filePath
  );

  const source = fs.createReadStream(filePath);

  const parser = parse({
    delimiter: "\t",
    columns: true,
    quote: false,
  });

  source.pipe(zlib.createGunzip()).pipe(parser);

  for await (const record of parser) {
    const {
      isAdult,
      startYear,
      endYear,
      runtimeMinutes,
      genres,
      ...rest
    } = record;

    await prisma.movie.create({
      data: {
        ...rest,
        isAdult: !!(isAdult === "1"),
        startYear: parseInt(startYear, 10),
        endYear: endYear === "\\N" ? null : parseInt(endYear, 10),
        runtimeMinutes:
          runtimeMinutes === "\\N" ? null : parseInt(runtimeMinutes, 10),
      },
    });
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
