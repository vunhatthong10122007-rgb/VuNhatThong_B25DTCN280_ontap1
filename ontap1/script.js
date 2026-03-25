let list = [
  { id: 1, name: "hãy trao cho anh", singer: "sơn tùng" },
  { id: 2, name: "về bên anh", singer: "jack" },
];

let keyName = "songs";
if (!localStorage.getItem(keyName)) {
  localStorage.setItem(keyName, JSON.stringify(list));
}
// xem đã có mảng chưa có thì lấy ra chưa thì thành mảng rỗng
let data = JSON.parse(localStorage.getItem(keyName)) || [];

const inpTitle = document.querySelector("#title");
const inpSinger = document.querySelector("#artist");
const btn = document.querySelector("#submitBtn");
const table = document.querySelector("#songTable");

let idEdit = null;

//hiển thị ra màn hình
function render() {
  let str = "";
  data.forEach((item) => {
    str += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.singer}</td>
        <td>
          <button onclick="editSong(${item.id})">Sửa</button>
          <button onclick="deleteSong(${item.id})">Xóa</button>
        </td>
      </tr>
    `;
    //btn có chatgpt
  });
  table.innerHTML = str;
}

function handleSubmit() {
  let t = inpTitle.value.trim();
  let s = inpSinger.value.trim();

  if (t === "" || s === "") {
    alert("điền vào, ai cho để trống 🍕");
    return;
  }

  if (idEdit !== null) {
    let index = data.findIndex((x) => x.id === idEdit);
    data[index].name = t;
    data[index].singer = s;

    idEdit = null;
    btn.innerText = "Thêm";
  } else {
    let id = data.length + 1;

    let newlist = {
      id: id,
      name: t,
      singer: s,
    };

    data.push(newlist);
  }

  localStorage.setItem(keyName, JSON.stringify(data));

  inpTitle.value = "";
  inpSinger.value = "";

  render();
}

function editSong(id) {
  let item = data.find((x) => x.id === id);

  inpTitle.value = item.name;
  inpSinger.value = item.singer;

  idEdit = id;

  btn.innerText = "cập nhât";
}

function deleteSong(id) {
  let ok = confirm("thật!!!");
  if (ok) {
    data = data.filter((x) => x.id !== id);
    localStorage.setItem(keyName, JSON.stringify(data));
    render();
  }
}
