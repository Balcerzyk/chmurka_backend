import parseFields from "./index.js";

test("returns array", () => {
  const item = {
    id: 2,
    tconst: "tt0000002",
    titleType: "short",
    primaryTitle: "Le clown et ses chiens",
    originalTitle: "Le clown et ses chiens",
    isAdult: false,
    startYear: 1892,
    endYear: null,
    runtimeMinutes: 5,
    genres: [],
  };

  expect(parseFields(item)).toBeInstanceOf(Array);
});

test("parses object with strings, numbers, booleans and arrays", () => {
  const item = {
    id: 2,
    tconst: "tt0000002",
    isAdult: false,
    genres: [],
  };

  expect(parseFields(item)).toStrictEqual([
    {
      name: "id",
      value: 2,
      type: "number",
      readonly: true,
    },
    {
      name: "tconst",
      value: "tt0000002",
      type: "string",
      readonly: false,
    },
    {
      name: "isAdult",
      value: false,
      type: "boolean",
      readonly: false,
    },
    {
      name: "genres",
      value: [],
      type: "array",
      readonly: false,
    },
  ]);
});
