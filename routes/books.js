var express = require('express');
var router = express.Router();

/* 
/books -> get all
/books/id -> get by id
/books -> post
/books/id -> put
/books/id ->delete
*/

var books = [{
  id: 1,
  name: "Tieng viet 1"
}, {
  id: 2,
  name: "Tieng viet 2"
}, {
  id: 3,
  name: "Tieng viet 3"
},]

//localhost:3000/books
router.get('/', function (req, res, next) {
  let undedeted = books.filter(b => !b.isDeleted)
  res.send(undedeted);
});

//localhost:3000/books/id
/*
 sử dụng hàm built-in của array để tìm và trả ra 1
  quyển 1 sách có id = req.params.id trong danh sách books
  yêu cầu: viết ra giấy có cả họ tên và MSSV
*/
router.get('/:id', function (req, res, next) {
  let book = books.find(e => e.id == req.params.id);
  if (book) {
    res.send(book)
  } else {
    res.status(404).send("id khong ton tai")
  }
});

function GenID(length) {
  let source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789';
  let result = "";
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random()*61) ;
    result += source[rand];
  }
  return result;
}

router.post('/', function (req, res, next) {
  let book = books.find(e => e.id == req.body.id);
  if (book) {
    res.status(404).send("id da ton tai")
  } else {
    let newbook = {
      id: req.body.id?req.body.id:GenID(16),
      name: req.body.name
    }
    books.push(newbook);
    res.send(newbook)
  }
});
router.put('/:id', function (req, res, next) {
  let book = books.find(e => e.id == req.params.id);
  if (!book) {
    res.status(404).send("id khong ton tai")
  } else {
    book.name = req.body.name
    res.send(book)
  }
});
router.put('/restore/:id', function (req, res, next) {
  let book = books.find(e => e.id == req.params.id);
  if (!book) {
    res.status(404).send("id khong ton tai")
  } else {
    book.isDeleted = undefined;
    delete book.isDeleted
    res.send(book)
  }
});


router.delete('/:id', function (req, res, next) {
  let book = books.find(e => e.id == req.params.id);
  if (!book) {
    res.status(404).send("id khong ton tai")
  } else {
    //books.splice(books.indexOf(book),1);
    book.isDeleted = true;
    res.send("da xoa")
  }
});


module.exports = router;
