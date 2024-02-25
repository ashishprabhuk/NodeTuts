const { error } = require("console");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "files", "Example.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  //works in asynchronous way
  if (err) {
    return console.error("Error reading file:", err);
  }
  console.log("File contents:", data);
});

fs.writeFile(filePath, "Hey this is Ashish 🤍💖", (err) => {
  if (err) {
    return console.error("Error writing file:", err);
  }
  console.log("File written successfully!");
  //rewrite the existing file
});

/*
  #callback hell (nested callbacks)
*/

//you can use './files/newFile.txt' to create new file in the same directory,
//best practice => or you can use path.join(__dirname, 'files', 'newFile.txt')
const filename = path.join(__dirname, "files", "newFile.txt");
fs.writeFile(filename, "Hello World!", (err) => {
  if (err) {
    return console.error("Error writing file:", err);
  }
  console.log("File written successfully!");
  //creates new file "newFile"

  fs.appendFile(filename, "\n\nHey this is Ashishprabhuk 🤍💖", (err) => {
    if (err) {
      return console.error("Error appending file:", err);
    }
    console.log("File appended successfully!");
    //Modify the file if exist or created a new file if it doesn't exist

    fs.rename(
      filename,
      path.join(__dirname, "files", "renamedFile.txt"),
      (err) => {
        if (err) {
          return console.error("Error renaming file:", err);
        }
        console.log("File renamed successfully!");
        // rename the file from "newFile" to "renamedFile"
      }
    );
  });
});

/*
  #Asynchronous/Promise way
*/

const fileOps = async () => {
  try {
    // Read the content of a file asynchronously
    const data = await fsPromise.readFile(filePath, "utf8");
    // Log the content read from the file
    console.log("Promise read: " + data);

    // Delete the file asynchronously
    await fsPromise.unlink(filePath);

    // Write content to a file asynchronously
    await fsPromise.writeFile(filePath, "Hey this is Ashish 🤍💖");

    // Append content to a file asynchronously
    await fsPromise.appendFile(filePath, "\n\nHowdy Peeps 🤍💖");

    // Rename a file asynchronously
    await fsPromise.rename(
      filePath,
      path.join(__dirname, "files", "renamedFile.txt")
    );

    // Read the content of the renamed file asynchronously
    const newData = await fsPromise.readFile(
      path.join(__dirname, "files", "renamedFile.txt"),
      "utf8"
    );

    // Log the content of the renamed file
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};
fileOps();

/*
  #Stream
*/

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// rs.on("data", (chunk) => {
//   ws.write(chunk);
// }); // => Not efficient way to copy the file

rs.pipe(ws); // => efficient way to copy the file

/*
  #Directory
*/

if (!fs.existsSync("./newDir")) {
  fs.mkdir("./newDir", (err) => {
    if (err) throw err;
    console.log("Directory created successfully!");
  });
}

if (fs.existsSync("./newDir")) {
  fs.rmdir("./newDir", (err) => {
    if (err) throw err;
    console.log("Directory removed successfully!");
  });
}

/*
  #Difference between Read / Write vs Streams

  Streams and read/write files are two different ways of handling data in Node.js, each with its own advantages and use cases.

1. Streams:
   - Streams are a way of efficiently handling data flow, particularly when dealing with large amounts of data.
   - They allow you to read from or write to a source or destination incrementally, in small chunks, rather than loading the entire data into memory at once.
   - Streams can be readable, writable, or both, depending on the context.
   - Common types of streams include Readable, Writable, Duplex, and Transform streams.
   - Examples of streams in Node.js include `fs.createReadStream()` for reading from files and `fs.createWriteStream()` for writing to files.
   - Streams are highly efficient for tasks like file I/O, network communication, and data processing, especially when dealing with large files or continuous data streams.

2. Read/Write Files:
   - Reading and writing files involves loading the entire file content into memory before processing it.
   - When you read a file using synchronous or asynchronous file reading methods like `fs.readFileSync()` or `fs.readFile()`, the entire file contents are loaded into memory as a single string or buffer.
   - Similarly, when you write to a file using synchronous or asynchronous file writing methods like `fs.writeFileSync()` or `fs.writeFile()`, the entire data to be written is buffered in memory before being written to the file.
   - While reading/writing files is simple and straightforward for small to medium-sized files, it can be inefficient and resource-intensive for large files or when dealing with streams of continuous data.
   - Reading/writing files is typically suitable for scenarios where the entire content of the file can fit into memory without causing performance issues.

In summary, streams are preferred for handling large or continuous data streams efficiently, while reading/writing files is more suitable for smaller files or when the entire file content needs to be processed as a whole. Streams offer better memory management and performance advantages, especially when dealing with large datasets, whereas reading/writing files provide simplicity and ease of use for smaller-scale file operations.
*/
