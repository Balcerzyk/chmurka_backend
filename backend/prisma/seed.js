import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import fs from "fs";
import fsPromises from "fs/promises";

import path from "path";
import parse from "csv-parse";
import fetch from "node-fetch";
import zlib from "zlib";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

function isNull(data) {
  return data === "\\N";
}

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
  const filePath = new URL("../title.basics.tsv.gz", import.meta.url);

  console.log(filePath);

  await fsPromises
    .stat(filePath)
    .then((stats) => {
      return fsPromises.unlink(filePath);
    })
    .catch((error) => {});

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

  let count = 0;

  for await (const record of parser) {
    if (process.env.MAX_SEED && count > process.env.MAX_SEED) break;
    count++;

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
        endYear: isNull(endYear) ? null : parseInt(endYear, 10),
        runtimeMinutes: isNull(runtimeMinutes)
          ? null
          : parseInt(runtimeMinutes, 10),
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
