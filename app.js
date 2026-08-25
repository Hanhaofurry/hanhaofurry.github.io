/* Hanhao English Studio — classroom-ready grammar feedback and searchable teacher resource desk. */
const resources = [
  { title: "一段閱讀，三層提問", summary: "用看見什麼、作者怎麼說、我怎麼想三個層次，把短文閱讀轉成討論。", category: "reading", type: "閱讀活動", time: "15 分鐘" },
  { title: "字根不是背誦：從 re- 開始", summary: "以 rewrite、return、reconnect 建立『再次／回到』的語意連結。", category: "vocabulary", type: "字彙策略", time: "10 分鐘" },
  { title: "現在完成式的時間線", summary: "用 since、for 和生活經驗，讓完成式不再只是公式。", category: "grammar", type: "句型與文法", time: "12 分鐘" },
  { title: "Four Corners：我同意嗎？", summary: "以一句可討論的主張，讓學生站位、說理由，再回應不同觀點。", category: "activity", type: "課堂活動", time: "15 分鐘" },
  { title: "從標題預測一篇文章", summary: "練習從標題、圖片與關鍵詞做有根據的閱讀預測。", category: "reading", type: "閱讀活動", time: "8 分鐘" },
  { title: "連接詞，讓想法走得更遠", summary: "用 because、although、therefore 把零散句子串成有方向的論述。", category: "grammar", type: "句型與文法", time: "12 分鐘" },
];

const resourceList = document.querySelector("#resource-list");
const resourceSearch = document.querySelector("#resource-search");
const emptyState = document.querySelector("#empty-state");
const resourceCount = document.querySelector("#resource-count");
let activeFilter = "all";

function renderResources() {
  const query = resourceSearch.value.trim().toLowerCase();
  const visible = resources.filter((resource) => {
    const categoryMatch = activeFilter === "all" || resource.category === activeFilter;
    const text = `${resource.title} ${resource.summary} ${resource.type}`.toLowerCase();
    return categoryMatch && (!query || text.includes(query));
  });
  resourceCount.textContent = String(visible.length).padStart(2, "0");
  emptyState.hidden = visible.length > 0;
  resourceList.innerHTML = visible.map((resource, index) => `
    <article class="resource-row">
      <span class="resource-number resource-number--${resource.category}">${String(index + 1).padStart(2, "0")}</span>
      <div class="resource-copy"><div class="resource-meta"><span>${resource.type}</span><i></i><span>${resource.time}</span></div><h3>${resource.title}</h3><p>${resource.summary}</p></div>
      <span class="resource-arrow" aria-hidden="true">↗</span>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("is-active", item === button));
    renderResources();
  });
});
resourceSearch.addEventListener("input", renderResources);
renderResources();

const feedback = document.querySelector("#grammar-feedback");
const answerButtons = document.querySelectorAll(".answer");
function resetGrammar() {
  answerButtons.forEach((button) => button.classList.remove("is-correct", "is-wrong"));
  feedback.innerHTML = "<strong>先選一個答案。</strong><p>提示：找找看句子裡的時間線索。</p>";
}
answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    answerButtons.forEach((item) => item.classList.remove("is-correct", "is-wrong"));
    if (button.dataset.answer === "correct") {
      button.classList.add("is-correct");
      feedback.innerHTML = "<strong>答對了：have studied。</strong><p><em>Since junior high school</em> 表示從過去某個起點持續到現在，因此使用現在完成式。</p>";
    } else {
      button.classList.add("is-wrong");
      feedback.innerHTML = "<strong>再想一下時間線。</strong><p>這件事從國中開始，而且現在仍然成立；試著找出能連接過去與現在的時態。</p>";
    }
  });
});
document.querySelector("#reset-grammar").addEventListener("click", resetGrammar);
