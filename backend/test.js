import Fuse from 'fuse.js'

const books = [
  { title: "Old Man's War", author: 'John Scalzi' },
  { title: 'The Lock Artist', author: 'Steve Hamilton' }
]

const fuse = new Fuse(books, {
  keys: ['title', 'author']
})

const results = fuse.search('jon')
console.log(results)
// [{ item: { title: "Old Man's War", author: "John Scalzi" }, refIndex: 0 }]import Fuse from "fuse.js";

const merchants = [

    { keyword: "amazon" },

    { keyword: "flipkart" },

    { keyword: "uber" }

];

const fuse2 = new Fuse(merchants, {

    keys: ["keyword"],

    threshold: 0.3,

});

const result = fuse2.search("amaz0n");

console.log(result);