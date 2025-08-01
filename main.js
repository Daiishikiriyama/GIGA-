// 子ども入力の保存
function submitChild() {
  const time = document.getElementById("timeType").value;
  const text = document.getElementById("childInput").value.trim();
  if (!text) return alert("入力してください");
  let data = JSON.parse(localStorage.getItem("childData") || "[]");
  data.push({ time, text });
  localStorage.setItem("childData", JSON.stringify(data));
  document.getElementById("childInput").value = "";
  alert("送信しました");
}

// Wordクラウドの生成
function generateWordCloud() {
  const data = JSON.parse(localStorage.getItem("childData") || "[]");
  let wordCounts = {};
  data.forEach(entry => {
    entry.text.split(/、|・|，|,|。|\s/).forEach(word => {
      if (word) wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  });
  const list = Object.entries(wordCounts);
  WordCloud(document.getElementById("wordCanvas"), { list });
}

// 教員メッセージの保存と表示
function submitTeacher() {
  const text = document.getElementById("teacherInput").value.trim();
  if (!text) return alert("入力してください");
  let messages = JSON.parse(localStorage.getItem("teacherMessages") || "[]");
  messages.push(text);
  localStorage.setItem("teacherMessages", JSON.stringify(messages));
  document.getElementById("teacherInput").value = "";
  displayTeacherMessages();
}

function displayTeacherMessages() {
  const messages = JSON.parse(localStorage.getItem("teacherMessages") || "[]");
  const list = document.getElementById("teacherList");
  list.innerHTML = "";
  messages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    list.appendChild(li);
  });
}

window.onload = () => {
  displayTeacherMessages();
  generateWordCloud();
};
