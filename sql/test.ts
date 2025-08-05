
import * as fs from 'fs';
import * as readline from 'readline';

const data = "id, Name, Age\n1, Ali, 22\n2, Kosar, 25\n3, Zahra, 12"
const insertToFile = async () => {
  return await fs.promises.writeFile("out.csv", data, "utf-8")
}
const getAll = async () => {
  try {
    const data = await fs.promises.readFile("out.csv", { encoding: "utf-8" });
    console.log(data)
    return data;
  } catch (error) {
    console.error(`Error reading ${"out.csv"}: ${error}`);
  }
}
const getById = (id: number) => {
  const r = readline.createInterface({
    input: fs.createReadStream("./out.csv"),
    crlfDelay: Infinity
  });
  r.on("line", (line) => {
    console.log(line)
    const parsedLine = line.split(",");
    if (parseInt(parsedLine[0]) === id) {
      console.log({ user: parsedLine })
      process.exit(0)

    }
  })
}
const callFunction = async () => {
  insertToFile();
  console.log(`***get all ***`)
  await getAll();
  console.log(`\n \n***get by id ***`)
  getById(2);
}
callFunction();
